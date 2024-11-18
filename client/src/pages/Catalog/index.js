import React from 'react';
import { Grid } from '@chakra-ui/react';

import Card from '../../components/Card';
import FilterBar from '../../components/FilterBar';

function Catalog() {
  return (
    <div>
      <div>
        <FilterBar />
      </div>
      <div>
        <Grid templateColumns='repeat(4, 1fr)' gap={5}>
            {/* TODO: dynamically add items, these are hard-coded items*/}
            <Card />
            <Card />
            <Card />
            <Card />
        </Grid>
      </div>
    </div>
  )
}

export default Catalog;