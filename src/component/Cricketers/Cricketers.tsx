import React, { useEffect, useState } from "react";
import { Table, Button, Input, Select, Space } from "antd";
import getPlayers from "../GetPlayers/GetPlayers";
import { Link } from "react-router-dom";
import { ColumnsType } from "antd/es/table";
import { Cricketer } from "../../props/Cricketer.props";
import Search from "antd/es/input/Search";
import { FilterOutlined } from "@ant-design/icons";

const { Option } = Select;
const Cricketers: React.FC = () => {
  const [cricketers, setCricketers] = useState<Cricketer[]>([]);
  const [currentCricketers, setCurrentCricketers] = useState<Cricketer[]>([]);
  const [pageSize, setPageSize] = useState<number>(10);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [sortBy, setSortBy] = useState<string>("name");
  const [filterBy, setFilterBy] = useState<string>("");
  const [searchQuery, setSearchQuery] = useState<string>("");

  useEffect(() => {
    fetchCricketers();
  }, []);

  useEffect(() => {
    updateCurrentCricketers();
  }, [cricketers, currentPage, pageSize, sortBy, filterBy, searchQuery]);

  const fetchCricketers = () => {
    getPlayers().then((data) => {
      return setCricketers(data as Cricketer[]);
    });
  };

  const updateCurrentCricketers = () => {
    let filteredCricketers = cricketers;

    if (filterBy) {
      filteredCricketers = filteredCricketers.filter(
        (cricketer) => cricketer.type === filterBy
      );
    }

    if (searchQuery) {
      filteredCricketers = filteredCricketers.filter((cricketer) =>
        cricketer.name.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    const sortedCricketers = sortCricketers(filteredCricketers);

    const startIndex = (currentPage - 1) * pageSize;
    const endIndex = startIndex + pageSize;

    setCurrentCricketers(sortedCricketers.slice(startIndex, endIndex));
  };

  const sortCricketers = (cricketers: Cricketer[]) => {
    switch (sortBy) {
      case "name":
        return cricketers.sort((a, b) => a.name.localeCompare(b.name));
      case "rank":
        return cricketers.sort((a, b) => a.rank - b.rank);
      case "age":
        return cricketers.sort((a, b) => a.dob - b.dob);
      default:
        return cricketers;
    }
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const handleSortChange = (value: string) => {
    setSortBy(value);
  };

  const handleFilterChange = (value: string) => {
    setFilterBy(value);
  };

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(event.target.value);
  };

  const handleSearchSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    updateCurrentCricketers();
  };

  const handleCricketerClick = (id: string) => {
    console.log(`Clicked on cricketer with ID: ${id}`);
  };

  const columns: ColumnsType<Cricketer> = [
    {
      title: "Rank",
      dataIndex: "rank",
      key: "rank",
    },
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
      render: (_, record) => (
        <Link to={`/cricketer/${record.id}`}>{record.name}</Link>
      ),
    },
    {
      title: "Description",
      dataIndex: "description",
      key: "description",
    },
    {
      title: "Type",
      dataIndex: "type",
      key: "type",
    },
    {
      title: "Points",
      dataIndex: "points",
      key: "points",
    },
      ];

  return (
    <div>
      <div>
        <label>Sort : </label>
        <Select
          defaultValue="name"
          style={{ width: 320 }}
          onChange={handleSortChange}
          size={"large"}
        >
          <Option value="name">Name</Option>
          <Option value="rank">Rank</Option>
          <Option value="age">Age</Option>
        </Select>
      </div>
      <br />
      <div>
        <label>Filter : </label>
        <Select
          defaultValue=""
          style={{ width: 320 }}
          onChange={handleFilterChange}
          suffixIcon={<FilterOutlined />}
          size={"large"}

        >
          <Option value="">All</Option>
          <Option value="batsman">Batsman</Option>
          <Option value="bowler">Bowler</Option>
          <Option value="allRounder">All-Rounder</Option>
          <Option value="wicketKeeper">Wicket Keeper</Option>
        </Select>
      </div>
      <br />
      <div>
      <label>Search : </label>
          <Search
            style={{ width: 320, marginRight: "10px" }}
            type="text"
            value={searchQuery}
            onChange={handleSearchChange}
            size={"large"}
          />
      </div>
      <Table
        dataSource={currentCricketers}
        columns={columns}
        rowKey="id"
        pagination={false}
      />
      <div>
        <Space>
          <Button
            disabled={currentPage === 1}
            onClick={() => handlePageChange(currentPage - 1)}
          >
            Previous Page
          </Button>
          <Button
            disabled={currentPage * pageSize >= cricketers.length}
            onClick={() => handlePageChange(currentPage + 1)}
          >
            Next Page
          </Button>
        </Space>
      </div>
    </div>
  );
};

export default Cricketers;
