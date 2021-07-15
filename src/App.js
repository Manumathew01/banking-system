import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Layout from "./components/Layout";
import HomePage from "./pages/HomePage/HomePage";
import CustomersPage from "./pages/CustomersPage/CustomersPage";
import Customer from "./components/Customer/Customer";
import TransactionsPage from "./pages/TransactionsPage/TransactionsPage";
import Transactions from "./components/Transactions/Transactions";
import Success from "./components/Transactions/Success";

function App() {
  return (
    <Router>
      <>
        <Layout>
          <Switch>
            <Route exact path="/" component={HomePage} />
            <Route exact path="/customers" component={CustomersPage} />
            <Route path="/customers/:Id" component={Customer} />
            <Route exact path="/payment" component={Transactions} />
            <Route path="/payment/success" component={Success} />
            <Route path="/transaction-history" component={TransactionsPage} />
          </Switch>
        </Layout>
      </>
    </Router>
  );
}

export default App;
