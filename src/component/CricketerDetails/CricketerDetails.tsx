import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { Typography, Button,Card } from "antd";
import { Cricketer, CricketerDetailsProps } from "../../props/Cricketer.props";
import getPlayers, { TPlayer } from "../GetPlayers/GetPlayers";

const { Title, Text } = Typography;


const CricketerDetails: React.FC<CricketerDetailsProps> = ({ cricketers }) => {
  const { id } = useParams<{ id: string }>();
  const [cricketer,setCricketer]=useState<TPlayer | undefined>()
  useEffect(() => {
    fetchCricketers();
  }, []);

  const fetchCricketers = () => {
    getPlayers().then((data) => {
     var cricketer :TPlayer | undefined = data.find((player) => player.id === id);
     setCricketer(cricketer)
    });
  };

  if (!cricketer) {
    return <div>Cricketer not found</div>;
  }

  const { name, description, type, points, rank, dob } = cricketer;
  const dateOfBirth = new Date(dob as unknown as string);
  const age = new Date().getFullYear() - dateOfBirth.getFullYear();

  return (
    <div>
      <Card  title={"Cricketer Details"} style={{ width: 500, margin: "0 auto" }}>
      <div style={{ textAlign: "left" }}>
        <Text strong>Name:</Text> {name}
        <br />
        <Text strong>Description:</Text> {description}
        <br />
        <Text strong>Type:</Text> {type}
        <br />
        <Text strong>Points:</Text> {points}
        <br />
        <Text strong>Rank:</Text> {rank}
        <br />
        <Text strong>Date of Birth:</Text> {dateOfBirth.toDateString()}
        <br />
        <Text strong>Age:</Text> {age}
        <br />
      </div>
      <div style={{ marginTop: 20, textAlign: "center" }}>
        <Link to="/cricketers">
          <Button type="primary">Back to Cricketers</Button>
        </Link>
      </div>
      </Card>
    </div>
  );
};

export default CricketerDetails;
