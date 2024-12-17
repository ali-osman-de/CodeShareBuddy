import React, { useEffect, useState } from 'react';
import { Button, Card, CardBody, CardSubtitle, CardTitle } from 'reactstrap';
import { useSelector } from 'react-redux';
import { doc, getDoc, updateDoc } from 'firebase/firestore'; // updateDoc ekliyoruz
import { db } from '../../../firebase';

const ProfileHeader = () => {
  const { uid, displayName } = useSelector((state) => state.auth);
  const [fullName, setFullName] = useState('');
  const [age, setAge] = useState('');
  const [profileImage, setProfileImage] = useState('');
  const [imageBase64, setImageBase64] = useState(''); // base64 verisi state

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
            setProfileImage(userData.profileImage); // Firestore'dan profil fotoğrafı çek
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

  // Resim yükleme inputu için referans
  const fileInputRef = React.createRef();

  // Dosya yüklendiğinde base64'e dönüştüren fonksiyon
  const handleFileChange = (e) => {
    const file = e.target.files[0];

    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const base64Data = reader.result; // Base64 formatındaki veri
        setProfileImage(base64Data); // Görseli güncelle
        setImageBase64(base64Data); // Base64 formatını state'e kaydet
      };
      reader.readAsDataURL(file);
    }
  };

  // Firestore'a resmi kaydet
  const handleSaveImage = async () => {
    if (!uid || !imageBase64) return; // Kullanıcı ID'si veya resim yoksa işlem yapma

    try {
      const userRef = doc(db, 'users', uid);
      await updateDoc(userRef, {
        profileImage: imageBase64, // Base64 verisini Firestore'a gönder
      });
      console.log('Profil fotoğrafı başarıyla güncellendi.');
    } catch (error) {
      console.error('Profil fotoğrafı güncellenirken hata oluştu:', error);
    }
  };

  // Resme tıklandığında inputu tetikleme
  const handleImageClick = () => {
    fileInputRef.current.click();
  };

  return (
    <div className='d-flex justify-content-center'>
      <div className='d-flex flex-column align-items-center'>
        {/* Profil Resmi */}
        <img
          className="bd-placeholder-img rounded-circle"
          width="140"
          height="140"
          alt="ProfilePicture"
          src={profileImage} // Firestore'dan gelen ya da state'teki fotoğraf
          onClick={handleImageClick} // Resme tıklandığında inputu aç
          style={{ cursor: 'pointer' }} // İmleç el şeklinde görünsün
        />
        {/* Dosya yükleme inputu (gizli) */}
        <input
          type="file"
          accept="image/*"
          ref={fileInputRef}
          style={{ display: 'none' }}
          onChange={handleFileChange}
        />

        {/* Kullanıcı Bilgileri */}
        <Card style={{ border: 'none' }}>
          <CardBody className='text-center'>
            <CardTitle className='fs-3 fw-semibold'>
              {fullName}
            </CardTitle>
            <CardSubtitle className="mb-2 fs-6 fw-light text-muted">
              Age {age}
            </CardSubtitle>
            <div className='mx-auto gap-3 mt-3'>
              <Button className='bg-light text-dark border-0 fs-6 fw-light'>Edit Profile</Button>
              <Button
                className='bg-dark text-white border-0 fs-6 fw-light'
                onClick={handleSaveImage} // Kaydet butonu tıklandığında Firestore'a gönder
              >
                Save
              </Button>
            </div>
          </CardBody>
        </Card>
      </div>
    </div>
  );
};

export default ProfileHeader;
