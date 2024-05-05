import { gql, useSuspenseQuery } from "@apollo/client";
import { WorkOrderType } from "../types";
import styled from "@emotion/styled";
import WorkOrderAdd from "./WorkOrderAdd";
import { useCallback, useState } from "react";

const GET_WORKORDERS = gql`
  query GetWorkOrders {
    getWorkOrders {
      id
      title
      description
      dueDate
      priority
    }
  }
`;

const Container = styled.section`
  display: flex;
  flex-direction: column;
  & > h1 {
    align-self: center;
  }
`;
const SubContainer = styled.section``;
const Header = styled.div`
  display: flex;
  background-color: #161616;
  padding: 10px;
  border-radius: 10px 10px 0 0;
`;
const Body = styled.div`
  background-color: #484848;
  border-radius: 0 0 10px 10px;
  overflow: auto;
  max-height: 600px;
`;
const Col = styled.div`
  flex: 1;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;
const Row = styled.div`
  display: flex;
  padding: 10px;
  &:nth-child(odd) {
    background-color: #383838;
  }
  &:hover {
    background-color: #505050;
  }
`;
const Button = styled.div`
  margin-left: 10px;
  background-color: #1a4d2e;
  color: white;
  border-radius: 50%;
  width: 40px;
  height: 40px;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  &:hover {
    cursor: pointer;
    background-color: #4f6f52;
  }
`;
const ContainerHeader = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
`;
const WorkOrder = () => {
  const { data, refetch } = useSuspenseQuery<{
    getWorkOrders: WorkOrderType[];
  }>(GET_WORKORDERS);
  const [showModal, setShowModal] = useState<boolean>(false);
  const handleOnClick = useCallback(() => {
    setShowModal((prev) => !prev);
    refetch();
  }, [refetch]);
  return (
    <Container>
      <ContainerHeader>
        <h1>Workforce</h1>
        <Button onClick={handleOnClick}>
          <span>+</span>
        </Button>
      </ContainerHeader>
      <SubContainer>
        <Header>
          <Col>ID</Col>
          <Col>TITLE</Col>
          <Col>DESCRIPTION</Col>
          <Col>DUE DATE</Col>
          <Col>PRIORITY </Col>
        </Header>
        <Body>
          {data.getWorkOrders.map((workOrder) => {
            return (
              <Row key={workOrder.id}>
                <Col>{workOrder.id}</Col>
                <Col>{workOrder.title}</Col>
                <Col>{workOrder.description}</Col>
                <Col>{workOrder.dueDate}</Col>
                <Col>{workOrder.priority}</Col>
              </Row>
            );
          })}
        </Body>
      </SubContainer>
      {showModal && <WorkOrderAdd onClose={handleOnClick} />}
    </Container>
  );
};

export default WorkOrder;
