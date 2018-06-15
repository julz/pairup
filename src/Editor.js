import React, { Component } from "react";
import styled from "styled-components";

import Card from './Card';

const Page = styled.div`
  display: grid;
  grid-template-columns: 5.48056% 1fr 10.96%;
  grid-template-areas: ". main .";
  background: green;
`

const Table = styled.div`
  grid-area: main;
  display: flex;
  background: red;
`

export default function Editor() {
  return <Page><Table><Card /><Card /></Table></Page>
}
