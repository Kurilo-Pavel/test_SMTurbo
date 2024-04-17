import Head from "next/head";
import {Inter} from "next/font/google";
import Table from "react-bootstrap/Table";
import {Alert, Container} from "react-bootstrap";
import {GetServerSideProps, GetServerSidePropsContext} from "next";
import {useState} from "react";
import Pagination from "@/pages/Pagination";

const inter = Inter({subsets: ["latin"]});

type TUserItem = {
  id: number
  firstname: string
  lastname: string
  email: string
  phone: string
  updatedAt: string
}

type TGetServerSideProps = {
  statusCode: number
  users: TUserItem[]
  usersCount: number
}

export const getServerSideProps = async (ctx: GetServerSidePropsContext): Promise<{ props: TGetServerSideProps }> => {
  try {
    const res = await fetch(`http://localhost:3000/users/1`, {method: 'GET'});
    const data = await res.json() as { users: TUserItem[], countUsers: number };
    if (!res.ok) {
      return {props: {statusCode: res.status, users: [], usersCount: 0}}
    }

    return {
      props: {statusCode: 200, users: data.users, usersCount: data.countUsers}
    }
  } catch (e) {
    return {props: {statusCode: 500, users: [], usersCount: 0}}
  }
}
// satisfies GetServerSideProps<TGetServerSideProps>;

export default function Home({statusCode, users, usersCount}: TGetServerSideProps) {
  const [newUsers, setNewUsers] = useState(users);

  if (statusCode !== 200) {
    return <Alert variant={'danger'}>Ошибка {statusCode} при загрузке данных</Alert>
  }

  return (
    <>
      <Head>
        <title>Тестовое задание</title>
        <meta name="description" content="Тестовое задание"/>
        <meta name="viewport" content="width=device-width, initial-scale=1"/>
        <link rel="icon" href="/favicon.ico"/>
      </Head>

      <main className={inter.className}>
        <Container>
          <h1 className={'mb-5'}>Пользователи</h1>

          <Table striped bordered hover>
            <thead>
            <tr>
              <th>ID</th>
              <th>Имя</th>
              <th>Фамилия</th>
              <th>Телефон</th>
              <th>Email</th>
              <th>Дата обновления</th>
            </tr>
            </thead>
            <tbody>
            {
              newUsers.map((user) => (
                <tr key={user.id}>
                  <td>{user.id}</td>
                  <td>{user.firstname}</td>
                  <td>{user.lastname}</td>
                  <td>{user.phone}</td>
                  <td>{user.email}</td>
                  <td>{user.updatedAt}</td>
                </tr>
              ))
            }
            </tbody>
          </Table>
          <Pagination usersCount={usersCount} setNewUsers={setNewUsers}/>
          {/*TODO add pagination*/}

        </Container>
      </main>
    </>
  );
}
