import ImageWithText from "../components/ImageWithText";
import Carroussel from "./Carroussel/Carroussel";

function Home() {
    return (
        <>
        <Carroussel />
        <ImageWithText
            imageSrc="./src/assets/images/CalendulaPlanta.png"
            altText="calendula"
            description="Somos una forma natural de cuidarte."
            textAlign="center"
            />
        </>
  );
}

export default Home;