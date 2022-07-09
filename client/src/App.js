import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import {
	ApolloProvider,
	ApolloClient,
	InMemoryCache,
	createHttpLink,
} from "@apollo/client";
import { setContext } from "@apollo/client/link/context";

import "./App.css";

const httpLink = createHttpLink({
	uri: "/graphql",
});

const authLink = setContext((_, { headers }) => {
	const token = localStorage.getItem("id_token");
	return {
		headers: {
			...headers,
			authorization: token ? `Bearer ${token}` : "",
		},
	};
});

const client = new ApolloClient({
	link: authLink.concat(httpLink),
	cache: new InMemoryCache(),
});

function App() {
	return (
		<ApolloProvider client={client}>
			<Router>
				<>
					{/* <Navbar /> */}
					<Routes>
						{/* <Route exact path="/" component={SearchBooks} /> */}
						{/* <Route exact path="/saved" component={SavedBooks} /> */}
						<Route render={() => <h1 className="display-2">Wrong page!</h1>} />
					</Routes>
				</>
			</Router>
		</ApolloProvider>
	);
}

export default App;
