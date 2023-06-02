import React, { useEffect, useState, useMemo } from "react";

import { Table, Row, Col, Tooltip, User, Text } from "@nextui-org/react";

import Swal from "sweetalert2";
import { useRouter } from "next/router";

import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/20/solid";

const PlanTable = ({
  columns,
  dataList,
  setUpdateTable,
  deletePath,
  session,
  role,
  setIsLoad,
}) => {
  const router = useRouter();

  const renderCell = (user, columnKey) => {
    // console.log(user);
    // const cellValue = user[columnKey];
    switch (columnKey) {
      case "username":
        return (
          <User
            src={user.gender == "male" ? "/user/men.png" : "/user/women.png"}
            css={{ p: 0 }}
          >
            <Col>
              <Row>
                <Text b size={14} css={{ tt: "capitalize" }}>
                  {user.username}
                </Text>
              </Row>
              <Row>
                <Text
                  b
                  size={13}
                  css={{ tt: "capitalize", color: "$accents7" }}
                >
                  id: {user.userID_usersProducer}
                </Text>
              </Row>
            </Col>
          </User>
        );

      case "status":
        let status = "active"; //user.status
        return (
          <StyledBadge type={status}>
            {status == "active"
              ? "ปกติ"
              : status == "paused"
              ? "ระงับการใช้งาน"
              : status}
          </StyledBadge>
        );

      case "actions":
        return (
          <Row justify="center" align="center">
            <Col css={{ d: "flex" }}>
              <Tooltip content="Details">
                <IconButton
                  onClick={() => {
                    setIsLoad(true);
                    router.push(
                      "/UserDetail?role=" +
                        role +
                        "&id=" +
                        user.userID_usersProducer
                    );
                  }}
                >
                  <EyeIcon size={20} fill="#979797" />
                </IconButton>
              </Tooltip>
            </Col>
            {/* <Col css={{ d: "flex" }}>
              <Tooltip content="Edit user">
                <IconButton
                  onClick={() => {
                    setIsLoad(true);
                    router.push({
                      pathname: "/Manager/EditUser",
                      query: { role: role, id: user.userID_usersProducer },
                    });
                  }}
                >
                  <EditIcon size={20} fill="#979797" />
                </IconButton>
              </Tooltip>
            </Col>
            <Col css={{ d: "flex" }}>
              <Tooltip
                content="Delete user"
                color="error"
                onClick={() => handleDelete(user)}
              >
                <IconButton>
                  <DeleteIcon size={20} fill="#FF0080" />
                </IconButton>
              </Tooltip>
            </Col> */}
          </Row>
        );
      default:
        return cellValue;
    }
  };

  const itemsPerPage = 10;
  const [page, setPage] = useState(1);
  const displayData = useMemo(() => {
    const start = (page - 1) * itemsPerPage;
    return dataList.slice(start, start + itemsPerPage);
  }, [dataList, page]);

  return (
    <>
      <div className="overflow-x-auto">
        <Table
          aria-label="Example table with custom cells"
          className="w-full p-2 m-1 appearance-none z-10"
          css={{
            height: "auto",
            minWidth: "100%",
          }}
          selectionMode="none"
        >
          <Table.Header columns={columns}>
            {(column) => (
              <Table.Column
                key={column.uid}
                hideHeader={column.uid === "actions"}
                align={column.uid === "actions" ? "center" : "start"}
              >
                {column.name}
              </Table.Column>
            )}
          </Table.Header>
          <Table.Body items={displayData}>
            {(item) => (
              <Table.Row key={item.role + "_" + item.userID_usersProducer}>
                {(columnKey) => (
                  <Table.Cell>{renderCell(item, columnKey)}</Table.Cell>
                )}
              </Table.Row>
            )}
          </Table.Body>
        </Table>

        {/* paging */}
        <div className="flex items-center justify-between border-t border-gray-200 bg-white px-4 py-3 sm:px-6">
          <div className="flex flex-1 justify-between sm:hidden">
            <a
              href="#"
              className="relative inline-flex items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
            >
              Previous
            </a>
            <a
              href="#"
              className="relative ml-3 inline-flex items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
            >
              Next
            </a>
          </div>
          <div className="hidden sm:flex sm:flex-1 sm:items-center sm:justify-between">
            <div>
              <p className="text-sm text-gray-700">
                Showing <span className="font-medium">{page}</span> to{" "}
                <span className="font-medium">
                  {Math.ceil(dataList.length / itemsPerPage)}
                </span>{" "}
                of <span className="font-medium">{dataList.length}</span>{" "}
                results
              </p>
            </div>
            <div>
              <nav
                className="isolate inline-flex -space-x-px rounded-md shadow-sm"
                aria-label="Pagination"
              >
                <a
                  onClick={() => {
                    if (page != 1) setPage(page - 1);
                  }}
                  // href="#"
                  className="relative inline-flex items-center rounded-l-md border border-gray-300 bg-white px-2 py-2 text-sm font-medium text-gray-500 hover:bg-gray-50 focus:z-20"
                >
                  <span className="sr-only">Previous</span>
                  <ChevronLeftIcon className="h-5 w-5" aria-hidden="true" />
                </a>

                <a
                  onClick={() => {
                    if (page != Math.ceil(dataList.length / itemsPerPage))
                      setPage(page + 1);
                  }}
                  className="relative inline-flex items-center rounded-r-md border border-gray-300 bg-white px-2 py-2 text-sm font-medium text-gray-500 hover:bg-gray-50 focus:z-20"
                >
                  <span className="sr-only">Next</span>
                  <ChevronRightIcon className="h-5 w-5" aria-hidden="true" />
                </a>
              </nav>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default PlanTable;
