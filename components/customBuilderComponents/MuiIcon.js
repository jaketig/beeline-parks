import { Builder, builder, withChildren } from '@builder.io/react';
import Icon from '@mui/material/Icon'

builder.init(process.env.BUILDER_API_KEY)

export const MuiIcon = withChildren((props) => {
  const iconProps = {...props};
  delete iconProps.builderBlock;
  delete iconProps.builderState;
  delete iconProps.iconName;

  return (
    <Icon {...iconProps}>{props.iconName}</Icon>
  )
})

Builder.registerComponent(MuiIcon, {
  name: 'MuiIcon',
  inputs: [
    {
      name: "iconName",
      type: "string",
      helperText: "Mui Icon Name (https://mui.com/components/material-icons/)"
    },
    {
      name: "color",
      type: "string",
      enum: ['inherit', 'primary', 'secondary', 'success', 'error', 'info', 'warning'],
      defaultValue: "inherit",
    },
    {
      name: "fontSize",
      type: "string",
      enum: ['inherit', 'large', 'medium', 'small'],
      defaultValue: "medium",
    },
  ]
})
