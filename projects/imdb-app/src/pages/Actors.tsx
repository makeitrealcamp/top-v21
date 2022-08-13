import { Spinner, Table } from 'react-bootstrap';

import ErrorLayoutBuilder from '../components/ErrorLayoutBuilder';
import useActors from '../domain/useActors';

export default function Actors() {
  const { data, error, loading } = useActors();

  if (loading) {
    return (
      <Spinner animation="border" role="status">
        <span className="visually-hidden">Loading...</span>
      </Spinner>
    );
  }

  return (
    <>
      <h2 className="my-4">Actors</h2>
      {error && <ErrorLayoutBuilder error={error} />}
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>#</th>
            <th>Name</th>
            <th>Created At</th>
            <th>Updated At</th>
          </tr>
        </thead>

        {data?.actors && (
          <tbody>
            {data.actors.map((actor) => (
              <tr key={actor.id}>
                <td>{actor.id}</td>
                <td>{actor.name}</td>
                <td>{actor.createdAt}</td>
                <td>{actor.updatedAt}</td>
              </tr>
            ))}
          </tbody>
        )}
      </Table>
    </>
  );
}
