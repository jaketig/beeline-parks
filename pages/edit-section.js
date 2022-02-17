import React, { useEffect, useState } from 'react';
import { BuilderComponent, Builder, builder } from '@builder.io/react';
import '@builder.io/widgets';
import '@/components/customBuilderComponents'
import {useRouter} from "next/router"

builder.init(process.env.BUILDER_API_KEY)

 function EditSection(props) {
  const [isBrowser, setIsBrowser] = useState(false);
  const router = useRouter();

  useEffect(() => {
    setIsBrowser(true);
  });

  if (!isBrowser) {
    return null;
  }

  if (!Builder.isPreviewing) {
    return null;
  }

  return (
    <>
      <BuilderComponent
        model="symbol"
        key={router.query.modelId}
      />
    </>
  );
}

EditSection.HideLayout = true;

export default EditSection