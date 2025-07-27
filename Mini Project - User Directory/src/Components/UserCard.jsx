import { Card, CardContent, Typography, CardActionArea, Avatar, Box } from '@mui/material';

const UserCard = ({ user, onClick }) => (
  <Card>
    <CardActionArea onClick={onClick}>
      <CardContent sx={{ display: 'flex', alignItems: 'center' }}>
        <Avatar src={user.picture.medium} sx={{ width: 56, height: 56, mr: 2 }} />
        <Box>
          <Typography variant="h6">
            {user.name.first} {user.name.last}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {user.email}
          </Typography>
        </Box>
      </CardContent>
    </CardActionArea>
  </Card>
);

export default UserCard;
