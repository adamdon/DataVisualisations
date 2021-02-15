import NavTop from './components/NavTop.js'
import LayoutContainer from './components/LayoutContainer.js'
import FullContentContainer from './components/FullContentContainer.js';
import MapTest from "./components/MapTest.js";
import CoinTest from "./components/CoinTest.js";
import exchangeTest from "./components/exchangeTest.js";




export default {
    name: "App",
    components: {NavTop, LayoutContainer, FullContentContainer, MapTest, CoinTest, exchangeTest},
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
        <FullContentContainer><exchangeTest></exchangeTest></FullContentContainer>
            <FullContentContainer><CoinTest></CoinTest></FullContentContainer>
            <FullContentContainer><MapTest></MapTest></FullContentContainer>
        </LayoutContainer>
    </section >
  `,
};