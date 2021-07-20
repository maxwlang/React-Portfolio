import '@forevolve/bootstrap-dark/dist/css/bootstrap-prefers-light.min.css';
import '@forevolve/bootstrap-dark/dist/css/bootstrap-prefers-dark.min.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../styles/bootstrap-override.scss';
// import '../styles/bootstrap.scss';

function App({ Component, pageProps }) {
  return <Component {...pageProps} />
}

export default App;
