import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.sass';
import reportWebVitals from './reportWebVitals';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Boards from './Pages/Boards/Boards';
import Board from './Pages/Board/Board';
import store from './store';
import { Provider } from 'react-redux';

const router = createBrowserRouter([
	{
		path: '/',
		element: <Boards />
	},
	{
		path: '/board/:id',
		element: <Board />
	}
]);

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
	// <React.StrictMode>
	<Provider store={store}>
		<RouterProvider router={router} />
	</Provider>
	// </React.StrictMode>
);

reportWebVitals();
