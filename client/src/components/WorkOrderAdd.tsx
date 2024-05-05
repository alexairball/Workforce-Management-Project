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
const Input = styled.input`
  padding: 6px 12px;
  background: #383838;
  border: 1px solid rgb(60, 63, 68);
  border-radius: 4px;
  font-size: 13px;
  height: 28px;
  appearance: none;
  transition: border 0.15s ease 0s;
  color-scheme: dark;
  margin-bottom: 5px;
  &:focus {
    outline: none;
    box-shadow: none;
    border-color: rgb(100, 153, 255);
  }
`;
const Select = styled.select`
  padding: 6px 12px;
  background: #383838;
  color: white;
  border: 1px solid rgb(60, 63, 68);
  border-radius: 4px;
  font-size: 13px;
  height: 40px;
  appearance: none;
  transition: border 0.15s ease 0s;
  &:focus {
    outline: none;
    box-shadow: none;
    border-color: rgb(100, 153, 255);
  }
`;
const ModalButton = styled.button`
  display: block;
  width: 100px;
  height: 40px;
  border-radius: 18px;
  background-color: #434343;
  border: solid 1px transparent;
  color: #ffffff;
  font-size: 14px;
  font-weight: 300;
  cursor: pointer;
  transition: all 0.1s ease-in-out;
  &:hover {
    background-color: transparent;
    border-color: #fff;
    transition: all 0.1s ease-in-out;
  }
`;

const Error = styled.div`
  color: red;
`;

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
            <Label>Title *</Label>
            <Input name={"title"}></Input>
            <Label>Description</Label>
            <Input name={"description"}></Input>
            <Label>Due date *</Label>
            <Input name={"dueDate"} type={"date"}></Input>
            <Label>Priority *</Label>
            <Select name={"priority"}>
              <option value={PriorityEnum.LOW}>Low</option>
              <option value={PriorityEnum.MEDIUM}>Medium</option>
              <option value={PriorityEnum.HIGH}>High</option>
              <option value={PriorityEnum.CRITICAL}>Critical</option>
            </Select>
            <Error>{error?.message || userError}</Error>
          </ModalBody>
          <ModalFooter>
            <ModalButton type={"submit"}>save</ModalButton>
          </ModalFooter>
        </form>
      </ModalContainer>
    </Modal>
  );
};

export default WorkOrderAdd;
