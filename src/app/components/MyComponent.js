//// MyComponent.js

// components/MyComponent.js

import { useQuery, gql } from '@apollo/client';

const MY_QUERY = gql`
  query MyQuery {
    myData {
      id
      name,
      age
    }
  }
`;

const MyComponent = () => {
  const { loading, error, data } = useQuery(MY_QUERY);

  console.log(data,"datadatadatadata")
  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  return (
    <div>
      <p>ID: {data.myData.id}</p>
      <p>Name: {data.myData.name}</p>
    </div>
  );
};

export default MyComponent;
export { MY_QUERY };