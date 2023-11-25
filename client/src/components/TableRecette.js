import { BiSearchAlt2 } from 'react-icons/bi';
import React, { useRef, useState } from 'react';
import Highlighter from 'react-highlight-words';
import { Avatar, Button, Input, Space, Table, Tag } from 'antd';
import { BsFillPersonFill } from 'react-icons/bs';
import { useNavigate } from 'react-router-dom';



const TableRecette = ({data,setData,isLoading,handledeleteRecette,handleUpdateRecette }) => {
    const navigate = useNavigate()
    const [searchText, setSearchText] = useState('');
    const [searchedColumn, setSearchedColumn] = useState('');
    const searchInput = useRef(null);

    const [tableParams, setTableParams] = useState({
        pagination: {
            current: 1,
            pageSize: 5,
        },
    });

    const handleTableChange = (pagination, filters, sorter) => {
        setTableParams({
            pagination,
            filters,
            ...sorter,
        });

        // `dataSource` is useless since `pageSize` changed
        if (pagination.pageSize !== tableParams.pagination?.pageSize) {
            setData([]);
        }
    };

    const handleSearch = (selectedKeys, confirm, dataIndex) => {
        confirm();
        setSearchText(selectedKeys[0]);
        setSearchedColumn(dataIndex);
    };
    const handleReset = (clearFilters) => {
        clearFilters();
        setSearchText('');
    };
    const getColumnSearchProps = (dataIndex) => ({
        filterDropdown: ({ setSelectedKeys, selectedKeys, confirm, clearFilters, close }) => (
            <div
                style={{
                    padding: 8,
                }}
                onKeyDown={(e) => e.stopPropagation()}
            >
                <Input
                    ref={searchInput}
                    placeholder={`Search ${dataIndex}`}
                    value={selectedKeys[0]}
                    onChange={(e) => setSelectedKeys(e.target.value ? [e.target.value] : [])}
                    onPressEnter={() => handleSearch(selectedKeys, confirm, dataIndex)}
                    style={{
                        marginBottom: 8,
                        display: 'block',
                    }}
                />
                <Space>
                    <Button
                        type="primary"
                        className='text-black hover:text-blue-400'
                        onClick={() => handleSearch(selectedKeys, confirm, dataIndex)}
                        icon={<BiSearchAlt2 />}
                        size="small"
                        style={{
                            width: 90,
                        }}
                    >
                        Search
                    </Button>
                    <Button
                        onClick={() => clearFilters && handleReset(clearFilters)}
                        size="small"
                        style={{
                            width: 90,
                        }}
                    >
                        Reset
                    </Button>
                    <Button
                        type="link"
                        size="small"
                        onClick={() => {
                            confirm({
                                closeDropdown: false,
                            });
                            setSearchText(selectedKeys[0]);
                            setSearchedColumn(dataIndex);
                        }}
                    >
                        Filter
                    </Button>
                    <Button
                        type="link"
                        size="small"
                        onClick={() => {
                            close();
                        }}
                    >
                        close
                    </Button>
                </Space>
            </div>
        ),
        filterIcon: (filtered) => (
            <BiSearchAlt2
                style={{
                    color: filtered ? '#1677ff' : undefined,
                }}
            />
        ),
        onFilter: (value, record) =>
            record[dataIndex].toString().toLowerCase().includes(value.toLowerCase()),
        onFilterDropdownOpenChange: (visible) => {
            if (visible) {
                setTimeout(() => searchInput.current?.select(), 100);
            }
        },
        render: (text) =>
            searchedColumn === dataIndex ? (
                <Highlighter
                    highlightStyle={{
                        backgroundColor: '#ffc069',
                        padding: 0,
                    }}
                    searchWords={[searchText]}
                    autoEscape
                    textToHighlight={text ? text.toString() : ''}
                />
            ) : (
                text
            ),
    });


    const columns = [
        //nom ingredients etapes duree photo user
        {
            title: 'Image',
            dataIndex: 'photo',
            key: 'photo',
            // responsive: ['md'],
            render: (text, record, index) =>(
                <div>
                   {
                    text ?
                        <Avatar src={text} size={35} />
                   :
                        <Avatar icon={<BsFillPersonFill />} className='flex justify-center items-center bg-orange-400' size={35} />

                   }
                </div>
            ),

        },
        {
            title: 'Nom',
            dataIndex: 'nom',
            key: 'nom',
            // width: '10%',
            ...getColumnSearchProps('nom'),
            sorter: (a, b) => a.nom - b.nom,
            sortDirections: ['descend', 'ascend'],
            // responsive: ['md'],
        },
        {
            title: 'Ingredients',
            dataIndex: 'ingredients',
            key: 'ingredients',
            // responsive: ['sm'],
            render: (text, record, index) => (
               <span>
                 {
                    record.map((index ,item)=>  (
                            <Tag key={index} className='cursor-pointer hover:bg-red-700 hover:text-white' color='error' >{item} </Tag>)
                    )
                 }
               </span>
            ),
        },
        {
            title: 'Etapes',
            dataIndex: 'etapes',
            key: 'etapes',
            // responsive: ['sm'],
            render: (text, record, index) => (
               <span>
                 {
                    record.map((index ,item)=>  (
                            <Tag key={index} className='cursor-pointer hover:bg-red-700 hover:text-white' color='cyan-inverse' >{item} </Tag>)
                    )
                 }
               </span>
            ),
        },
        {
            title: 'duree',
            dataIndex: 'duree',
            key: 'duree',
         
            ...getColumnSearchProps('duree'),
            sorter: (a, b) => a.duree - b.duree,
            sortDirections: ['descend', 'ascend'],
            // responsive: ['md'],

        },
       
        {
            title: 'Action',
            key: 'action',
            // responsive: ['sm'],
            render: (text, record, index) => (
               <span>
                 <Tag className='cursor-pointer hover:bg-red-700 hover:text-white' color='error' onClick={()=> {handledeleteRecette(record.id)}}>Supprimer</Tag>
                 <Tag className='cursor-pointer hover:bg-orange-500 hover:text-white' color='orange' onClick={()=> {handleUpdateRecette(record)}}>Modifier</Tag>
               </span>
            ),
        }
    
    ];
    return <Table columns={columns} dataSource={data} pagination={tableParams.pagination}
       scroll={{ x: "max-content"}}
        rowKey="id"
        loading={isLoading}
        onChange={handleTableChange} />;
};
export default TableRecette;