import "./App.css";
import { Button, MantineProvider, TextInput, Checkbox } from "@mantine/core";

const App = (): JSX.Element => {
  return (
    <MantineProvider>
      <div className="App">
        Be aware of the difference between default and named exports. It is a
        common source of mistakes. We suggest that you stick to using default
        imports and exports when a module only exports a single thing (for
        example, a component). That’s what you get when you use export default
        Button and import Button from './Button'. Named exports are useful for
        utility modules that export several functions. A module may have at most
        one default export and as many named exports as you like.
        <br />
        <Button size="md">Click here to login</Button>
        <br />
        <TextInput placeholder="Your name" label="Full name" required />
        <br />
        <Checkbox label="I agree to sell my privacy" />
      </div>
    </MantineProvider>
  );
};

export default App;
