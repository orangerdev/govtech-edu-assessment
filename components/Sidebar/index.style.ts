import styled from "styled-components"

export const Wrapper = styled.aside`
  background-color: var(--color-white);

  &.sidebar-hidden {
    display: none;
    width: 0 !important;
  }

  &.sidebar-shown {
    display: block;
  }

  .ant-checkbox-group {
    display: grid;
    gap: 0.5rem;
  }

  .pokemon-type-filter {
    .ant-checkbox-group {
      grid-template-columns: repeat(3, minmax(0, 1fr));
    }
  }

  .pokemon-generation-filter {
    .ant-checkbox-group {
      grid-template-columns: repeat(4, minmax(0, 1fr));
    }
  }
`
