
import { useCallback, useState } from "react";

import DesktopOnly from "../components/DesktopOnly";
import { EnvelopeExperience } from "../pages/EnvelopeExperience";
import StoryOfNight from "../pages/StoryOfNight";
import VinylReveal from "../pages/VinylReveal";

export function App() {
  const [noteComplete, setNoteComplete] = useState(false);

  const handleNoteComplete = useCallback(() => {
    setNoteComplete(true);
  }, []);

  return (
    <DesktopOnly>
      <EnvelopeExperience onNoteComplete={handleNoteComplete} />

      {noteComplete && (
        <>
          <StoryOfNight />
          <VinylReveal />
        </>
      )}
    </DesktopOnly>
  );
}

export default App;
