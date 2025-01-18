import React from 'react';
// ...existing code...

function App() {
  return (
    <Router>
      <Switch>
        <Route exact path="/" component={HomePage} />
        {/* ...existing routes... */}
        {/* Remove conflicting routes */}
      </Switch>
    </Router>
  );
}

export default App;