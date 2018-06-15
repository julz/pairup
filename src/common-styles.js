import styled from "styled-components";
import Shevy from "shevyjs";

const shevy = new Shevy({ proximity: true });
export const {
  baseSpacing: bs,
  h1: { fontSize, lineHeight, marginBottom }
} = shevy;

export const Control = styled.div`
  text-decoration: underline;
  width: 24px;
  height: 24px;
  cursor: pointer;
`;

export const Controls = styled.div`
  justify-content: center;
  align-items: center;
  align-content: center;
  display: flex;
  flex-direction: vertical;
`;

export const Checklist = styled.ul`
  padding: 0;
  margin: ${bs(1)};
  border-radius: 9px;
`;

export const ChecklistItem = styled.li`
  display: flex;
  border-bottom: 1px solid #eee;
  margin-left: 0;
  align-items: center;
`;

export const Check = styled.div`
  width: ${bs(1)};
  height: ${bs(1)};
  background: white;
  border: 2px solid #ccc;
  margin: 0 ${bs(1)};
  color: #999;
  display: flex;
  text-align: right;
  justify-content: center;
  justify-items: center;
  align-content: center;
  align-items: center;
  font-weight: bolder;
  padding: 0;
  cursor: pointer;
`;
