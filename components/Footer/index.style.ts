import styled from "styled-components"

export const Wrapper = styled.footer`
  background-color: var(--color-white);

  .compare-scroll {
    position: absolute;
    bottom: 6px;
    right: 96px;
    width: 220px;
    height: 24px;
    overflow: auto;
    text-align: right;

    @media screen and (max-width: 480px) {
      width: 56px;
    }
    figure {
      width: 24px;
      height: 24px;
      display: inline-block;
      background-color: var(--color-white);
      margin: 0 2px;
    }
  }
`
