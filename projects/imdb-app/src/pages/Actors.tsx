import { useEffect, useState } from 'react';
import { Button, Spinner, Table } from 'react-bootstrap';

import ErrorLayoutBuilder from '../components/ErrorLayoutBuilder';
import AddModal from '../containers/AddModal';
import useActors from '../domain/useActors';

export default function Actors() {
  const {
    data,
    error,
    loading,
    refetch,
    actions: {
      create: { apply: createActor, data: createActorData },
    },
  } = useActors();
  const [showModal, setShowModal] = useState(false);

  function handleConfirm(name: string) {
    setShowModal(false);
    createActor({
      variables: {
        input: {
          name,
        },
      },
    });
  }

  useEffect(() => {
    if (createActorData) {
      refetch();
    }
  }, [createActorData, refetch]);

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
      <Button onClick={() => setShowModal(true)}>Add Actor</Button>
      <AddModal
        title="Add Actor"
        show={showModal}
        handleClose={() => setShowModal(false)}
        handleConfirm={handleConfirm}
      />
      <Table striped bordered hover className="mt-4">
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
