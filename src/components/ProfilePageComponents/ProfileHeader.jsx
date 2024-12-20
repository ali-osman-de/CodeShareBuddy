import React, { useEffect, useState } from 'react';
import { Button, Card, CardBody, CardSubtitle, CardTitle, Toast, ToastBody, ToastHeader } from 'reactstrap';
import { useSelector } from 'react-redux';
import { doc, getDoc, updateDoc } from 'firebase/firestore';
import { db } from '../../../firebase';

const ProfileHeader = () => {
  const { uid, displayName } = useSelector((state) => state.auth);
  const [fullName, setFullName] = useState('');
  const [age, setAge] = useState('');
  const [profileImage, setProfileImage] = useState('');
  const [imageBase64, setImageBase64] = useState('');
  const [showToast, setShowToast] = useState(false);
  const [samePhotoToast, setSamePhotoToast] = useState(false);


  const fileInputRef = React.createRef();

  useEffect(() => {
    const fetchUserData = async () => {
      if (!uid) return;

      try {
        const userRef = doc(db, 'users', uid);
        const userDoc = await getDoc(userRef);

        if (userDoc.exists()) {
          const userData = userDoc.data();
          setFullName(userData.fullName);
          setAge(userData.age);
          if (userData.profileImage) {
            setProfileImage(userData.profileImage);
          }
        } else {
          console.log('Kullanıcı verisi bulunamadı.');
          setFullName(displayName || '');
        }
      } catch (error) {
        console.error('Veri çekilirken hata oluştu:', error);
      }
    };

    fetchUserData();
  }, [uid]);

  const handleFileChange = (e) => {
    const file = e.target.files[0];

    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const base64Data = reader.result;

        // Sıkıştırma işlemi
        const img = new Image();
        img.src = base64Data;
        img.onload = () => {
          const canvas = document.createElement('canvas');
          const maxWidth = 500; 
          const maxHeight = 500; 
          let width = img.width;
          let height = img.height;

          if (width > height) {
            if (width > maxWidth) {
              height = (height * maxWidth) / width;
              width = maxWidth;
            }
          } else {
            if (height > maxHeight) {
              width = (width * maxHeight) / height;
              height = maxHeight;
            }
          }

          canvas.width = width;
          canvas.height = height;
          const ctx = canvas.getContext('2d');
          ctx.drawImage(img, 0, 0, width, height);

          const compressedBase64 = canvas.toDataURL('image/jpeg', 0.8);
          setProfileImage(compressedBase64);
          setImageBase64(compressedBase64);
        };
      };
      reader.readAsDataURL(file);
    }
  };
  const handleSaveImage = async () => {
    if (!uid || !imageBase64) return;

    try {
      const userRef = doc(db, 'users', uid);

      const userDoc = await getDoc(userRef);

      if (userDoc.exists()) {
        const userData = userDoc.data();

        if (userData.profileImage === imageBase64) {
          console.log('Yeni yüklenen fotoğraf mevcut fotoğraf ile aynı.');
          setSamePhotoToast(true);
          setTimeout(() => setSamePhotoToast(false), 3000);
          return;
        }
      }


      await updateDoc(userRef, {
        profileImage: imageBase64,
      });

      console.log('Profil fotoğrafı başarıyla güncellendi.');

      setShowToast(true);


      setTimeout(() => {
        setShowToast(false);
      }, 3000);
    } catch (error) {
      console.error('Profil fotoğrafı güncellenirken hata oluştu:', error);
    }
  };

  const handleImageClick = () => {
    fileInputRef.current.click();
  };

  return (
    <div className="d-flex justify-content-center">
      <div className="d-flex flex-column align-items-center">
        {/* Profil Resmi */}
        <div
          className="bd-placeholder-img rounded-circle"
          style={{
            width: '140px',
            height: '140px',
            backgroundColor: '#777',
            cursor: 'pointer',
            overflow: 'hidden',
          }}
          onClick={handleImageClick}
        >
          {profileImage ? (
            <img
              src={profileImage}
              alt="ProfilePicture"
              style={{
                width: '100%',
                height: '100%',
                objectFit: 'cover',
              }}
            />
          ) : (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="100%"
              height="100%"
              viewBox="0 0 100 100"
            >
              <rect width="100%" height="100%" fill="#777" />
              <text
                x="50%"
                y="50%"
                fill="#fff"
                dy=".3em"
                fontSize="20"
                textAnchor="middle"
              >
                No Image
              </text>
            </svg>
          )}
        </div>

        <input
          type="file"
          accept="image/*"
          ref={fileInputRef}
          style={{ display: 'none' }}
          onChange={handleFileChange}
        />

        {/* Kullanıcı Bilgileri */}
        <Card style={{ border: 'none' }}>
          <CardBody className="text-center">
            <CardTitle className="fs-3 fw-semibold">
              {fullName || 'User Name'}
            </CardTitle>
            <CardSubtitle className="mb-2 fs-6 fw-light text-muted">
              Age {age || 'N/A'}
            </CardSubtitle>
            <div className="mx-auto gap-3 mt-3">
              <Button
                className="bg-dark text-white border-0 fs-6 fw-light"
                onClick={handleSaveImage}
              >
                Update Photo
              </Button>
            </div>
          </CardBody>
        </Card>
      </div>

      {/* Toast Mesajı */}
      {showToast && (
        <div
          className="position-fixed bottom-0 end-0 p-3"
          style={{
            zIndex: 1050,
          }}
        >
          <Toast>
            <ToastHeader icon="success">
              Profile Photo Update
            </ToastHeader>
            <ToastBody>
              Your profile image was updated successfully!
            </ToastBody>
          </Toast>
        </div>
      )}

      {samePhotoToast && (
        <div
          className="position-fixed bottom-0 end-0 p-3"
          style={{
            zIndex: 1050
          }}
        >
          <Toast>
            <ToastHeader icon="warning">
              Profile Photo
            </ToastHeader>
            <ToastBody>
              The uploaded image is the same as your current profile picture.
            </ToastBody>
          </Toast>
        </div>
      )}
    </div>
  );
};

export default ProfileHeader;