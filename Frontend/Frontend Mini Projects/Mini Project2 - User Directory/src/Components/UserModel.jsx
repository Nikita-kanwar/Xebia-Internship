import { Modal, Box, Typography, Avatar } from '@mui/material';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  bgcolor: 'background.paper',
  boxShadow: 24,
  p: 4,
  borderRadius: 2,
  textAlign: 'center',
};

const UserModal = ({ open, onClose, user }) => {
  if (!user) return null;

  return (
    <Modal open={open} onClose={onClose}>
      <Box sx={style}>
        <Avatar src={user.picture.large} sx={{ width: 100, height: 100, mx: 'auto', mb: 2 }} />
        <Typography variant="h5">
          {user.name.title} {user.name.first} {user.name.last}
        </Typography>
        <Typography variant="body1" mt={1}>{user.email}</Typography>
        <Typography variant="body2" mt={1}>
          Location: {user.location.city}, {user.location.country}
        </Typography>
        <Typography variant="body2" mt={1}>
          Phone: {user.phone}
        </Typography>
      </Box>
    </Modal>
  );
};

export default UserModal;
