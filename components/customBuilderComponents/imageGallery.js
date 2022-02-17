import SimpleReactLightbox, { SRLWrapper } from "simple-react-lightbox";
import Masonry from '@mui/lab/Masonry';
import {builder, Builder} from "@builder.io/react";

builder.init(process.env.BUILDER_API_KEY)


function ImageGallery(props) {
  return (
    <SimpleReactLightbox>
      <SRLWrapper>
        <Masonry
          columns={{ sm: 2, md: 3, lg: 4}}
          spacing={2}
          defaultHeight={450}
          defaultColumns={4}
          defaultSpacing={1}
        >
        {(props.images || []).map((image) =>
          <a href={image.src} key={image.src}>
            <img src={image.src} alt={image.alt} style={{width: '100%'}}/>
          </a>
        )}
        </Masonry>
      </SRLWrapper>
    </SimpleReactLightbox>
  );
}


Builder.registerComponent(ImageGallery, {
  name: "ImageGallery",
  inputs: [
    {
      name: "images",
      type: "list",
      subFields: [
        {
          name: "src",
          type: "file",
          allowedFileTypes: ["jpeg", "png"],
          required: true
        },
        {
          name: "alt",
          type: "string",
          helperText: "description of image",
          required: true
        },
      ],
    },
  ],
});

export default ImageGallery;