import React from "react";
import styled from "styled-components";
import { Droppable, Draggable } from "react-beautiful-dnd";
import { PaperPlane as ConcourseIcon } from "styled-icons/fa-solid/PaperPlane";

const ConcourseBadge = styled.div`
  color: green;
  width: 36px;
  height: 36px;
  border: 4px solid green;
  box-shadow: 0px 0px 1px 2px rgba(0, 0, 0, 0.4), 0px 0px 0px 5px #fc0,
    0px 0px 4px 4px black;
  border-radius: 99px;
  background: white;
  z-index: 99;

  ${props =>
    props.locked &&
    `
    cursor: pointer;
    box-shadow: 0px 0px 1px 2px rgba(0, 0, 0, 0.4), 0px 0px 0px 4px #fff,
      0px 0px 4px 4px black;
    `};
`;

// haha only kidding, there's only one badge
export default function Badges({
  dropId,
  badges,
  lockedBadges,
  onToggleBadgeLocked
}) {
  badges = badges || [];

  return (
    <Droppable direction="vertical" droppableId={"badge" + dropId} type="BADGE">
      {(provided, snapshot) => (
        <div
          style={{
            width: 48,
            height: 96,
            position: "absolute",
            top: 16,
            right: 12,
            zIndex: 999
          }}
          ref={provided.innerRef}
          {...provided.droppableProps}
        >
          {badges.map((badge, i) => (
            <Draggable
              isDragDisabled={lockedBadges[badge]}
              draggableId={"badge-" + i}
              index={i}
              key={i}
            >
              {(provided, snapshot) => (
                <div
                  ref={provided.innerRef}
                  {...provided.draggableProps}
                  {...provided.dragHandleProps}
                >
                  <ConcourseBadge
                    style={{ zIndex: 1 }}
                    locked={lockedBadges[badge]}
                    onClick={onToggleBadgeLocked}
                  >
                    <ConcourseIcon />
                  </ConcourseBadge>
                </div>
              )}
            </Draggable>
          ))}
        </div>
      )}
    </Droppable>
  );
}
