import NavTop from './NavTop.js'
import LayoutContainer from './LayoutContainer.js'
import FullContentContainer from './FullContentContainer.js';
import MapTest from "./MapTest.js";
import CoinTest from "./CoinTest.js";




export default {
    name: "App",
    components: {NavTop, LayoutContainer, FullContentContainer, MapTest, CoinTest}, // MapTest, CoinTest},
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