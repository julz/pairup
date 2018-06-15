import React from "react";
import { Droppable, Draggable } from "react-beautiful-dnd";
import styled from "styled-components";
import { AddCircle as AddIcon } from "styled-icons/material";

import Card from "./Card";
import { bs } from "./common-styles";

const TrackContainer = styled.div`
  position: relative;
  padding-top: ${bs(0.5)};
  padding-bottom: ${bs(2)};
  transition: min-width 200ms cubic-bezier(0.42, 0, 0.58, 1);
`;

const Title = styled.h4`
  position: absolute;
  bottom: 0px;
  color: white;
  width: 100%;
  text-align: center;
  left: 0px;
`;

const Cards = styled.div`
  padding: ${bs(1)};
  margin-bottom: ${bs};
  display: flex;
  min-height: 125px;
`;

const GhostCards = Cards.extend`
  padding: 0;
`;

const CardControl = styled.div`
  text-decoration: underline;
  width: 0;
  height: 122px;
  cursor: pointer;
  justify-content: center;
  align-content: center;
  align-items: center;
  text-align: center;
  transition: all 800ms cubic-bezier(0.42, 0, 0.58, 1);
  display: flex;
  padding: 0;
  margin: 0;
  overflow: hidden;
`;

const AddCardButton = AddIcon.extend`
  color: #fc0;
  width: 0px;
  height: 0px;
  opacity: 0;

  transition: all 800ms cubic-bezier(0.42, 0, 0.58, 1);

  &:hover {
    color: #fff;
  }
`;

export default function Track({
  children,
  title,
  minCards,
  dragEnabled,
  dropId,
  showAddButton,
  badges,
  lockedBadges,
  onAddCard,
  onToggleLocked,
  onToggleBadgeLocked
}) {
  minCards = minCards || 2;
  children = children || [];
  badges = badges || [];
  onAddCard = onAddCard || (() => {});
  onToggleLocked = onToggleLocked || (() => {});
  onToggleBadgeLocked = onToggleBadgeLocked || (() => {});
  lockedBadges = lockedBadges || {};
  children = Array.isArray(children) ? children : [children];
  const childIds = children.map(child => child.props.dragId);

  return (
    <TrackContainer
      style={
        { minWidth: 48 + Math.max(minCards, children.length) * 110 } // hack! :)
      }
    >
      <Title>{title}</Title>
      <Droppable direction="horizontal" droppableId={dropId} type="CARD">
        {(provided, snapshot) => (
          <Cards
            innerRef={provided.innerRef}
            {...provided.droppableProps}
            style={Object.assign(
              !snapshot.isDraggingOver ||
              childIds.indexOf(snapshot.draggingOverWith) > -1
                ? {}
                : {
                    paddingRight:
                      children.length > 0 && snapshot.isDraggingOver
                        ? "110px"
                        : "0px"
                  }
            )}
          >
            <div
              style={{
                position: "absolute",
                opacity: snapshot.isDraggingOver ? 0.4 : 0.2
              }}
            >
              <GhostCards>
                {[
                  ...Array(
                    Math.max(
                      minCards,
                      children.length +
                        (snapshot.isDraggingOver &&
                        childIds.indexOf(snapshot.draggingOverWith) < 0
                          ? 1
                          : 0)
                    )
                  ).keys()
                ].map(i => <Card ghost key={"ghost" + i} />)}
              </GhostCards>
            </div>
            {children.map((card, i) => (
              <Draggable
                isDragDisabled={!dragEnabled || card.props.locked}
                draggableId={card.props.dragId}
                index={i}
                key={i}
              >
                {(provided, snapshot) => (
                  <div
                    key={"card" + i}
                    ref={provided.innerRef}
                    {...provided.draggableProps}
                    {...provided.dragHandleProps}
                    onClick={() => onToggleLocked(card.props.dragId)}
                  >
                    {card}
                  </div>
                )}
              </Draggable>
            ))}
            <CardControl
              style={{
                width: showAddButton ? 90 : 0
              }}
            >
              <AddCardButton
                onClick={onAddCard}
                style={
                  showAddButton
                    ? {
                        width: 48,
                        height: 48,
                        opacity: 100,
                        transform: "rotate(360deg)"
                      }
                    : {}
                }
              />
            </CardControl>
          </Cards>
        )}
      </Droppable>
      {badges}
    </TrackContainer>
  );
}
