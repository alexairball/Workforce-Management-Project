import { gql, useMutation } from "@apollo/client";
import styled from "@emotion/styled";
import { useCallback, useEffect, useState } from "react";
import { CreateWorkOrderType, PriorityEnum } from "../types";
import { formatField, validateField } from "../utils/util";

const Modal = styled.div`
  position: absolute;
  z-index: 1;
  background-color: rgba(40, 40, 40, 0.5);
  width: 100%;
  height: 100%;
`;

const ModalContainer = styled.div`
  margin: auto;
  width: 300px;
`;
const ModalHeader = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  padding: 10px;
  border-radius: 10px 10px 0 0;
  background-color: #161616;
`;
const Title = styled.div``;
const CloseButton = styled.div`
  &:hover {
    cursor: pointer;
  }
`;
const ModalBody = styled.div`
  padding: 10px;
  background-color: #505050;
  display: flex;
  flex-direction: column;
  justify-content: center;
`;
const ModalFooter = styled.div`
  display: flex;
  flex-direction: row;
  padding: 10px;
  border-radius: 0 0 10px 10px;
  background-color: #161616;
`;
const Label = styled.div``;
const Input = styled.input``;

const ADD_WORKORDER = gql`
  mutation AddWorkOrder($newOrder: Order) {
    addWorkOrder(newOrder: $newOrder) {
      description
      dueDate
      id
      priority
      title
    }
  }
`;

const WorkOrderAdd = ({ onClose }: { onClose: () => void }) => {
  const [addWorkOrder, { data, error }] = useMutation(ADD_WORKORDER);
  const [userError, setUserError] = useState<string | null>(null);

  const handleOnSubmit = useCallback(
    (event: React.FormEvent<HTMLFormElement>) => {
      event.preventDefault();
      setUserError(null);
      const data = new FormData(event.currentTarget);
      const newOrder: CreateWorkOrderType = {
        title: data.get("title") as string,
        description: data.get("description") as string,
        dueDate: data.get("dueDate") as string,
        priority: data.get("priority") as string,
      };
      const error = validateField(newOrder);
      if (error) {
        setUserError(error);
      } else {
        addWorkOrder({
          variables: { newOrder: formatField(newOrder) },
        });
      }
    },
    [addWorkOrder]
  );
  useEffect(() => {
    if (data) {
      onClose();
    }
  }, [data, onClose]);
  return (
    <Modal>
      <ModalContainer>
        <form onSubmit={handleOnSubmit}>
          <ModalHeader>
            <Title>Work order</Title>
            <CloseButton onClick={onClose}>X</CloseButton>
          </ModalHeader>
          <ModalBody>
            <Label>Title</Label>
            <Input name={"title"}></Input>
            <Label>Description</Label>
            <Input name={"description"}></Input>
            <Label>Due date</Label>
            <Input name={"dueDate"} type={"date"}></Input>
            <Label>Priority</Label>
            <select name={"priority"}>
              <option value={PriorityEnum.LOW}>Low</option>
              <option value={PriorityEnum.MEDIUM}>Medium</option>
              <option value={PriorityEnum.HIGH}>High</option>
              <option value={PriorityEnum.CRITICAL}>Critical</option>
            </select>
            {error?.message || userError}
          </ModalBody>
          <ModalFooter>
            <button type={"submit"}>save</button>
          </ModalFooter>
        </form>
      </ModalContainer>
    </Modal>
  );
};

export default WorkOrderAdd;
