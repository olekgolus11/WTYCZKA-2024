"use client";

import React, { useState, useEffect } from "react";
import { collection, getDocs, query, limit } from "firebase/firestore";
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
                    Imię
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
                    Nazwisko
                    <ArrowUpDown className='ml-2 h-4 w-4' />
                </Button>
            );
        },
    },
    { accessorKey: "email", header: "Email" },
    { accessorKey: "phone", header: "Telefon" },
    { accessorKey: "pesel", header: "PESEL" },
    { accessorKey: "sex", header: "Płeć" },
    { accessorKey: "faculty", header: "Wydział" },
    { accessorKey: "indexNumber", header: "Indeks" },
    { accessorKey: "degree", header: "Stopień" },
    { accessorKey: "collegeLevel", header: "Studia" },
    { accessorKey: "fieldOfStudy", header: "Kierunek Study" },
    { accessorKey: "diet", header: "Dieta" },
    { accessorKey: "shirtSize", header: "Rozmiar koszulki" },
    { accessorKey: "source", header: "Źródło" },
    { accessorKey: "sourceOther", header: "Źródło (Inne)" },
    { accessorKey: "invoice", header: "Faktura" },
    { accessorKey: "statuteAccept", header: "Akceptacja statutu" },
    { accessorKey: "personalDataAccept", header: "Akceptacja danych" },
    { accessorKey: "additionalAccept", header: "Akceptacja przetwarzania danych" },
    { accessorKey: "firstNameInvoice", header: "Imię (Faktura)" },
    { accessorKey: "lastNameInvoice", header: "Nazwisko (Faktura)" },
    { accessorKey: "nipPeselInvoice", header: "NIP/PESEL (Faktura)" },
    { accessorKey: "birthDate", header: "Data urodzenia" },
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
    const [correctPassword, setCorrectPassword] = useState<string | null>(null);

    useEffect(() => {
        const fetchPassword = async () => {
            try {
                const credentialsQuery = query(collection(db, "credentials"), limit(1));
                const credentialsSnapshot = await getDocs(credentialsQuery);
                if (!credentialsSnapshot.empty) {
                    const credentialDoc = credentialsSnapshot.docs[0];
                    setCorrectPassword(credentialDoc.data().password);
                } else {
                    setError("No credentials found in the database.");
                }
            } catch (err) {
                console.error("Error fetching password:", err);
                setError("Error fetching credentials. Please try again later.");
            }
        };

        fetchPassword();
    }, []);

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
            <div className='rounded-md border overflow-x-auto'>
                <Table className='border-collapse table-auto w-full'>
                    <TableHeader>
                        {table.getHeaderGroups().map((headerGroup) => (
                            <TableRow key={headerGroup.id} className='bg-gray-100'>
                                {headerGroup.headers.map((header) => (
                                    <TableHead key={header.id} className='border px-4 py-2 text-left font-bold'>
                                        {header.isPlaceholder ? null : flexRender(header.column.columnDef.header, header.getContext())}
                                    </TableHead>
                                ))}
                            </TableRow>
                        ))}
                    </TableHeader>
                    <TableBody>
                        {table.getRowModel().rows?.length ? (
                            table.getRowModel().rows.map((row, i) => (
                                <TableRow key={row.id} data-state={row.getIsSelected() && "selected"}>
                                    {row.getVisibleCells().map((cell) => (
                                        <TableCell key={cell.id} className='border px-4 py-2 whitespace-nowrap'>
                                            {flexRender(cell.column.columnDef.cell, cell.getContext())}
                                        </TableCell>
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
            <div className="flex items-center justify-between space-x-2 py-4">
        <div className="flex-1 text-sm ">
          Showing {table.getState().pagination.pageIndex * table.getState().pagination.pageSize + 1} to {Math.min((table.getState().pagination.pageIndex + 1) * table.getState().pagination.pageSize, table.getFilteredRowModel().rows.length)} of{" "}
          {table.getFilteredRowModel().rows.length} entries
        </div>
        <div className="space-x-2">
          <Button
            onClick={() => table.previousPage()}
            disabled={!table.getCanPreviousPage()}
          >
            Previous
          </Button>
          <Button
            onClick={() => table.nextPage()}
            disabled={!table.getCanNextPage()}
          >
            Next
          </Button>
        </div>
      </div>
        </div>
    );
};

export default ViewerPage;
