import React from 'react';
import {
  Grid,
  Card,
  CardContent,
  CardMedia,
  Typography,
  Button,
  CardActionArea,
  CardActions,
} from '@mui/material';
import Panel from '@ui/components/Panel';
import Icon from '@ui/elements/Icon';
import Title from '@ui/elements/Title';
import { useConsumer } from '@website/hooks/consumer';

export const FeedPanel = () => {
  const attributes = useConsumer();

  const NoPosts = () => (
    <Grid container justifyContent={'center'} flex={1} spacing={2}>
      <Grid
        alignItems={'center'}
        textAlign={'center'}
        justifyContent={'center'}
        item
        xs={12}
        sm={12}
        md={12}
        lg={12}
        xl={12}
      >
        <Icon name={attributes?.meta?.icon || 'fa-square'} color="#eee" size="120px" />
      </Grid>
      <Grid
        alignItems={'center'}
        textAlign={'center'}
        justifyContent={'center'}
        item
        xs={12}
        sm={12}
        md={12}
        lg={12}
        xl={12}
      >
        <Title sx={{ marginTop: '10px' }} variant="normal">
          No posts available
        </Title>
      </Grid>
    </Grid>
  );
  return (
    <Grid item xs={12} sm={12} md={6} lg={6} xl={6}>
      {/* <Panel style={{ padding: '16px', justifyContent: 'center' }}> */}
      {attributes && attributes?.data?.length > 0 ? (
        attributes?.data?.map((item, index) => (
          <Card
            sx={{ alignContent: 'center', justifyContent: 'center', marginBottom: '16px' }}
            key={index}
          >
            <CardActionArea>
              {item.image ? (
                <CardMedia
                  component="img"
                  height="140"
                  image={`/uploads/posts/${item.image}`}
                  alt="green iguana"
                />
              ) : null}
              <CardContent>
                <Typography gutterBottom variant="h5" component="div">
                  {item.title || `Post ${index + 1}`}
                </Typography>
                <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                  {item.summary || 'No summary available.'}
                </Typography>
              </CardContent>
            </CardActionArea>
            <CardActions>
              <Button size="small" color="primary">
                Share
              </Button>
            </CardActions>
          </Card>
        ))
      ) : (
        <Panel style={{ padding: '16px', justifyContent: 'center' }}>
          <NoPosts />
        </Panel>
      )}
    </Grid>
  );
};

export default FeedPanel;
