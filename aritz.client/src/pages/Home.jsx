import ImageWithText from "../components/ImageWithText";
import Carroussel from "./Carroussel/Carroussel";

function Home() {
    return (
        <>
        <Carroussel />
        <ImageWithText
            imageSrc="./assets/images/CalendulaPlanta.png"
            altText="calendula"
            description="Esto es boca che"
            textAlign="center"
            />
        </>
  );
}

export default Home;