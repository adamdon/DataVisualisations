import NavTop from './components/NavTop.js'
import LayoutContainer from './components/LayoutContainer.js'
import FullContentContainer from './components/FullContentContainer.js';
import MapTest from "./components/MapTest.js";
import CoinTest from "./components/CoinTest.js";




export default {
    name: "App",
    components: {NavTop, LayoutContainer, FullContentContainer, MapTest, CoinTest},
    data()
    {
        return {
            count: 0,
        };
    },

    template: `
    <section class="index">
        <NavTop></NavTop>
        <LayoutContainer>
            <FullContentContainer><CoinTest></CoinTest></FullContentContainer>
            <FullContentContainer><MapTest></MapTest></FullContentContainer>
        </LayoutContainer>
    </section >
  `,
};