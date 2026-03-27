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
import Icon from '@ui/elements/Icon';
import Title from '@ui/elements/Title';
import { useConsumer } from '@website/hooks/consumer';
import { Loader } from '@ui/components/Placeholder';

export const FeedPanel = () => {
  const { meta, isFetching, responsePayload } = useConsumer();
  const [ready, setReady] = React.useState(false);
  const feedIcon = meta?.icon || 'fa-rss';

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
        <Icon name={feedIcon} color="#eee" style={{ fontSize: '120px' }} />
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

  const Placeholder = () => (
    <Card sx={{ alignContent: 'center', justifyContent: 'center', marginBottom: '16px' }}>
      <CardActionArea>
        <div style={{ background: '#eee', display: 'inline-block', width: '100%' }}>
          <Icon
            name="fa-image"
            style={{ display: 'flex', margin: '0 auto' }}
            size="8x"
            color="#ddd"
          />
        </div>
        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
            <Loader style={{ flex: 1 }} variant="text" height={25} width="30%" />
          </Typography>
          <Typography variant="body2" sx={{ color: 'text.secondary' }}>
            <Loader style={{ flex: 1 }} variant="text" height={25} width="70%" />
          </Typography>
        </CardContent>
      </CardActionArea>
      <CardActions>
        <Button size="small" color="primary">
          <Loader style={{ flex: 1 }} variant="text" height={25} width="100%" />
        </Button>
      </CardActions>
    </Card>
  );

  React.useEffect(() => {
    if (!isFetching) {
      setReady(true);
    }
  }, [isFetching]);

  return (
    <Grid item xs={12} sm={12} md={6} lg={6} xl={6} className="feed-panel">
      {(responsePayload()?.length > 0 &&
        !isFetching &&
        responsePayload().map((item, index) => (
          <Card
            sx={{ alignContent: 'center', justifyContent: 'center', marginBottom: '16px' }}
            key={index}
          >
            <CardActionArea>
              {item?.image ? (
                <CardMedia
                  component="img"
                  height="140"
                  image={`/uploads/posts/${item?.image}`}
                  alt="green iguana"
                />
              ) : (
                <div style={{ background: '#eee', display: 'inline-block', width: '100%' }}>
                  <Icon
                    name="fa-image"
                    style={{ display: 'flex', margin: '0 auto' }}
                    size="8x"
                    color="#ddd"
                  />
                </div>
              )}
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
        ))) ||
        (ready && <NoPosts />)}
      {!ready && <Placeholder />}
      {isFetching ? <>Loading ...</> : ''}
    </Grid>
  );
};

export default FeedPanel;
