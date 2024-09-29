"use client";

import React, { useState, useEffect } from "react";
import { collection, getDocs } from "firebase/firestore";
import { db } from "@/config/firebase";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import {
    ColumnDef,
    flexRender,
    getCoreRowModel,
    useReactTable,
    getPaginationRowModel,
    getSortedRowModel,
    SortingState,
    getFilteredRowModel,
    ColumnFiltersState,
} from "@tanstack/react-table";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { registrationType } from "@/components/RegistrationForm/registrationType";
import { ArrowUpDown } from "lucide-react";

const columns: ColumnDef<registrationType>[] = [
    {
        accessorKey: "firstName",
        header: ({ column }) => {
            return (
                <Button variant='ghost' onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}>
                    First name
                    <ArrowUpDown className='ml-2 h-4 w-4' />
                </Button>
            );
        },
    },
    {
        accessorKey: "lastName",
        header: ({ column }) => {
            return (
                <Button variant='ghost' onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}>
                    Last name
                    <ArrowUpDown className='ml-2 h-4 w-4' />
                </Button>
            );
        },
    },
    {
        accessorKey: "email",
        header: "Email",
    },
    {
        accessorKey: "phone",
        header: "Phone",
    },
    {
        accessorKey: "faculty",
        header: "Faculty",
    },
    {
        accessorKey: "fieldOfStudy",
        header: "Field of Study",
    },
    {
        accessorKey: "degree",
        header: "Degree",
    },
    {
        accessorKey: "collegeLevel",
        header: "College Level",
    },
];

const ViewerPage = () => {
    const [users, setUsers] = useState<registrationType[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [sorting, setSorting] = useState<SortingState>([]);
    const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [password, setPassword] = useState("");
    const [loginError, setLoginError] = useState<string | null>(null);

    const correctPassword = "admin123";

    useEffect(() => {
        if (isLoggedIn) {
            const fetchUsers = async () => {
                try {
                    const querySnapshot = await getDocs(collection(db, "registration"));
                    const fetchedUsers: registrationType[] = [];
                    querySnapshot.forEach((doc) => {
                        fetchedUsers.push(doc.data() as registrationType);
                    });
                    setUsers(fetchedUsers);
                    setLoading(false);
                } catch (err) {
                    setError("Error fetching users");
                    setLoading(false);
                    console.error("Error fetching users:", err);
                }
            };

            fetchUsers();
        }
    }, [isLoggedIn]);

    const handleLogin = (e: React.FormEvent) => {
        e.preventDefault();
        if (password === correctPassword) {
            setIsLoggedIn(true);
            setLoginError(null);
        } else {
            setLoginError("Incorrect password. Please try again.");
        }
    };

    const table = useReactTable({
        data: users,
        columns,
        getCoreRowModel: getCoreRowModel(),
        getPaginationRowModel: getPaginationRowModel(),
        onSortingChange: setSorting,
        getSortedRowModel: getSortedRowModel(),
        onColumnFiltersChange: setColumnFilters,
        getFilteredRowModel: getFilteredRowModel(),
        state: {
            sorting,
            columnFilters,
        },
    });

    if (!isLoggedIn) {
        return (
            <div className='flex justify-center items-center h-screen'>
                <Card className='w-[350px]'>
                    <CardHeader>
                        <CardTitle>Login to View Data</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <form onSubmit={handleLogin}>
                            <div className='grid w-full items-center gap-4'>
                                <div className='flex flex-col space-y-1.5'>
                                    <Input
                                        id='password'
                                        type='password'
                                        placeholder='Enter password'
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                    />
                                </div>
                                <Button type='submit'>Login</Button>
                            </div>
                        </form>
                        {loginError && <p className='text-red-500 mt-2'>{loginError}</p>}
                    </CardContent>
                </Card>
            </div>
        );
    }

    if (loading) return <div>Loading...</div>;
    if (error) return <div>Error: {error}</div>;

    return (
        <div className='p-4'>
            <h1 className='text-2xl font-bold mb-4'>Registered Users</h1>
            <div className='flex items-center py-4'>
                <Input
                    placeholder='Filter emails...'
                    value={(table.getColumn("email")?.getFilterValue() as string) ?? ""}
                    onChange={(event) => table.getColumn("email")?.setFilterValue(event.target.value)}
                    className='max-w-sm'
                />
            </div>
            <div className='rounded-md border'>
                <Table>
                    <TableHeader>
                        {table.getHeaderGroups().map((headerGroup) => (
                            <TableRow key={headerGroup.id}>
                                {headerGroup.headers.map((header) => {
                                    return (
                                        <TableHead key={header.id}>
                                            {header.isPlaceholder ? null : flexRender(header.column.columnDef.header, header.getContext())}
                                        </TableHead>
                                    );
                                })}
                            </TableRow>
                        ))}
                    </TableHeader>
                    <TableBody>
                        {table.getRowModel().rows?.length ? (
                            table.getRowModel().rows.map((row) => (
                                <TableRow key={row.id} data-state={row.getIsSelected() && "selected"}>
                                    {row.getVisibleCells().map((cell) => (
                                        <TableCell key={cell.id}>{flexRender(cell.column.columnDef.cell, cell.getContext())}</TableCell>
                                    ))}
                                </TableRow>
                            ))
                        ) : (
                            <TableRow>
                                <TableCell colSpan={columns.length} className='h-24 text-center'>
                                    No results.
                                </TableCell>
                            </TableRow>
                        )}
                    </TableBody>
                </Table>
            </div>
            <div className='flex items-center justify-end space-x-2 py-4'>
                <Button variant='outline' size='sm' onClick={() => table.previousPage()} disabled={!table.getCanPreviousPage()}>
                    Previous
                </Button>
                <Button variant='outline' size='sm' onClick={() => table.nextPage()} disabled={!table.getCanNextPage()}>
                    Next
                </Button>
            </div>
        </div>
    );
};

export default ViewerPage;
