import "./App.css";
import { Header, VideoView, VideoSelect, Separator } from './components'
import { useState } from "react";

const App = (): JSX.Element => {

  const [videoPath, setVideoPath] = useState<string | null>(null)

  return (
    <div className="App">
      <Header />
      <div className="flex-start main">
        <VideoSelect setVideoPath={setVideoPath} />
        <Separator />
        <VideoView />
      </div>
    </div>
  );
};

export default App;
/* <p>
        Be aware of the difference between default and named exports. It is a
        common source of mistakes. We suggest that you stick to using default
        imports and exports when a module only exports a single thing (for
        example, a component). That’s what you get when you use export default
        Button and import Button from './Button'. Named exports are useful for
        utility modules that export several functions. A module may have at most
        one default export and as many named exports as you like.
      </p>

      <br />
      <Button size={20}>Normal Button</Button>
      <br />
      <Button appearance="primary">Primary Button</Button>
      <br />
      <h1>This text is in h1</h1>
      <h2>This text is in h2</h2>
      <h3>This text is in h3</h3>
      <h4>This text is in h4</h4>

      <p className="cap">this text should be in capital</p>
      <br />
      <div className="flex">
        <Avatar
          appearance="circle"
          src="https://pbs.twimg.com/profile_images/803832195970433027/aaoG6PJI_400x400.jpg"
          size="large"
          name="John Doe"
        />
        &nbsp;&nbsp;&nbsp;
        <span>
          <h5>John Doe</h5>
          <small>johndoe@gmail.com</small>
        </span>
      </div> */