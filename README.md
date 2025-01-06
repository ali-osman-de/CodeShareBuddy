# CodeShareBuddy  

Yıldız Teknik Üniversitesi BTO3121 Web Tabanlı Programlama dersi bitirme projesine ait bir GitHub deposu bulunmaktadır.  

**CodeShareBuddy**, kullanıcıların kod parçacıklarını başkalarıyla paylaşmasına olanak tanıyan bir web uygulamasıdır. Bu proje, React ve Vite kullanılarak geliştirilmiş ve Firebase ile entegre edilmiştir.  

---

**CodeShareBuddy** is a web application that allows users to share code snippets with others. This project was developed using React and Vite, and it is integrated with Firebase.  

---

## 📌 Projeye Katkıda Bulunanlar / Contributors  

- Osman Suheyl Düzel  
- Mustafa Mervan  
- Ali Osman Demirkollu  

---

## 🔥 Özellikler / Features  

- **Kullanıcı Kimlik Doğrulama / User Authentication**  
  - Firebase Authentication kullanılarak kullanıcılar kayıt olabilir, giriş yapabilir ve çıkış yapabilir.  
  - Users can register, log in, and log out using Firebase Authentication.  

- **Kod Parçacığı Oluşturma / Code Snippet Creation**  
  - Kimliği doğrulanmış kullanıcılar yeni kod parçacıkları oluşturabilir. Kod parçacıklarına başlık, açıklama, kod, programlama dili ve isteğe bağlı olarak bir resim eklenebilir.  
  - Authenticated users can create new code snippets with a title, description, code, programming language, and optionally an image.  

- **Keşfet ve Ara / Explore and Search**  
  - Kullanıcılar başkaları tarafından paylaşılan kod parçacıklarını keşfedebilir ve arama yapabilir.  
  - Users can explore and search for code snippets shared by others.  

- **Profil Yönetimi / Profile Management**  
  - Kullanıcılar profil bilgilerini görüntüleyebilir ve düzenleyebilir, ayrıca profil resmi yükleyebilir.  
  - Users can view and edit their profile information and upload a profile picture.  

- **Özel Rotalar / Private Routes**  
  - Belirli sayfalar korumalıdır ve yalnızca kimliği doğrulanmış kullanıcılar tarafından erişilebilir.  
  - Some pages are protected and accessible only to authenticated users.  

- **Duyarlı Tasarım / Responsive Design**  
  - Uygulama, Bootstrap kullanılarak duyarlı bir tasarım ve düzen sunar.  
  - The app offers a responsive design and layout using Bootstrap.  

---

## 🌐 Canlı Proje / Live Project  

- Canlı projeyi görmek için [buraya tıklayın](https://codesharebuddy.netlify.app/).  
- Click [here](https://codesharebuddy.netlify.app/) to view the live project.  

---

## 🛠️ Kurulum / Installation  

Projeyi yerel ortamınızda çalıştırmak için aşağıdaki adımları izleyin:  
To run the project locally, follow these steps:  

1. Depoyu klonlayın:
   ```sh
   git clone https://github.com/kullaniciadi/codesharebuddy.git
   ```
2. Proje dizinine gidin:
   ```sh
   cd codesharebuddy
   ```
3. Gerekli bağımlılıkları yükleyin:
   ```sh
   npm install
   ```
4. Projeyi başlatın:
   ```sh
   npm run dev
   ```
