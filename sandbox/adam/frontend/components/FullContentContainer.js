export default {
    name: "FullContentContainer",

    template: `
    <div class="row no-gutters">  <!-- row start -->
        <div class="col-xs-12 col-sm-12 col-md-12 col-lg-12 col-xl-12"> <!-- col start  -->

            <div class="content-container-fluid">
                <slot></slot>
            </div>

        </div> <!-- col end  -->
    </div> <!-- row end  -->
  `,
};