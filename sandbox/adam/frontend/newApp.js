import NavTop from './NavTop.vue'
import LayoutContainer from './LayoutContainer.vue'
import FullContentContainer from './FullContentContainer.vue';
import MapTest from "./MapTest.vue";
import CoinTest from "./CoinTest.vue";




export default {
    name: "index",
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