package com.antailbaxt3r.disastermanagementapp.ui.addRefugee;

import android.Manifest;
import android.app.Dialog;
import android.app.ProgressDialog;
import android.content.ContentResolver;
import android.content.Context;
import android.content.DialogInterface;
import android.content.Intent;
import android.content.pm.PackageManager;
import android.graphics.Bitmap;
import android.net.Uri;
import android.os.Bundle;
import android.os.Environment;
import android.os.StrictMode;
import android.provider.MediaStore;
import android.text.format.DateFormat;
import android.util.Log;
import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;
import android.webkit.MimeTypeMap;
import android.widget.Button;
import android.widget.EditText;
import android.widget.ImageView;
import android.widget.LinearLayout;
import android.widget.Toast;

import androidx.annotation.NonNull;
import androidx.annotation.Nullable;
import androidx.core.app.ActivityCompat;
import androidx.core.content.ContextCompat;
import androidx.fragment.app.Fragment;
import androidx.lifecycle.ViewModelProviders;

import com.antailbaxt3r.disastermanagementapp.R;
import com.antailbaxt3r.disastermanagementapp.activities.MainActivity;
import com.antailbaxt3r.disastermanagementapp.models.PeopleAPIModel;
import com.antailbaxt3r.disastermanagementapp.retrofit.RetrofitClient;
import com.google.android.gms.tasks.OnFailureListener;
import com.google.android.gms.tasks.OnSuccessListener;
import com.google.firebase.storage.FirebaseStorage;
import com.google.firebase.storage.StorageReference;
import com.google.firebase.storage.UploadTask;

import org.json.JSONObject;

import java.io.ByteArrayOutputStream;
import java.io.File;
import java.io.IOException;
import java.util.HashMap;
import java.util.Map;
import java.util.UUID;
import java.util.logging.Logger;

import retrofit2.Call;
import retrofit2.Callback;
import retrofit2.Response;

import static android.app.Activity.RESULT_OK;

public class AddRefugeeFragment extends Fragment {

    private static final int PICK_IMAGE_REQUEST = 107;
    private static final int USE_CAMERA = 1071;
    private AddRefugeeViewModel addRefugeeViewModel;
    private EditText name, age, email, number, foundAt;
    private ImageView image;
    private LinearLayout uploadButton;
    private String imageURL;
    private StorageReference mStorageRef;
    private Uri imageURI;
    ProgressDialog progressDialog;

    public View onCreateView(@NonNull LayoutInflater inflater,
                             ViewGroup container, Bundle savedInstanceState) {
        addRefugeeViewModel = ViewModelProviders.of(this).get(AddRefugeeViewModel.class);
        final View root = inflater.inflate(R.layout.fragment_add_refugee, container, false);
        attachID(root);
        mStorageRef = FirebaseStorage.getInstance().getReference();

        progressDialog =  new ProgressDialog(getContext());
        progressDialog.setMessage("Loading...");
        image.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                loadImage(root);
            }
        });

        uploadButton.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                progressDialog.show();
                uploadContents();
            }
        });

        return root;
    }

    private void uploadContents() {
        final StorageReference fileReference = mStorageRef.child(name.getText().toString() + age.getText().toString() + ".jpg");
        image.setDrawingCacheEnabled(true);
        image.buildDrawingCache();
        Bitmap bitmap = image.getDrawingCache();
        ByteArrayOutputStream baos = new ByteArrayOutputStream();
        bitmap.compress(Bitmap.CompressFormat.JPEG, 100, baos);
        byte[] data = baos.toByteArray();

        UploadTask uploadTask = fileReference.putBytes(data);
        uploadTask.addOnFailureListener(new OnFailureListener() {
            @Override
            public void onFailure(@NonNull Exception exception) {
                // Handle unsuccessful uploads
            }
        }).addOnSuccessListener(new OnSuccessListener<UploadTask.TaskSnapshot>() {
            @Override
            public void onSuccess(UploadTask.TaskSnapshot taskSnapshot) {
                // taskSnapshot.getMetadata() contains file metadata such as size, content-type, and download URL.
//                imageURI = Uri.parse(taskSnapshot.getStorage().getDownloadUrl().toString());
                fileReference.getDownloadUrl().addOnSuccessListener(new OnSuccessListener<Uri>() {
                    @Override
                    public void onSuccess(Uri uri) {
                        imageURI = uri;
                        Log.i("URL : ", imageURI.toString());
                        Map<String, Object> map = new HashMap<>();
                        map.put("name", name.getText().toString());
                        map.put("number", number.getText().toString());
                        map.put("rescueCenter", foundAt.getText().toString());
                        map.put("age", age.getText().toString());
                        map.put("image", imageURI.toString());


                        Call call = RetrofitClient.getClient().sendPerson(map);
                        call.enqueue(new Callback() {
                            @Override
                            public void onResponse(Call call, Response response) {
                                Toast.makeText(getContext(), "UPLOADED", Toast.LENGTH_SHORT).show();
                                progressDialog.dismiss();
                            }

                            @Override
                            public void onFailure(Call call, Throwable t) {
                                progressDialog.dismiss();
                            }
                        });
                    }

                });
            }
        });




    }

    private void loadImage(View root) {
        Context context;
        final Dialog dialog = new Dialog(root.getContext());
        dialog.setContentView(R.layout.dialog_layout);
        Button gallery = dialog.findViewById(R.id.gallery_btn);
        Button camera = dialog.findViewById(R.id.camera_btn);
        gallery.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {

                if(ActivityCompat.checkSelfPermission(getActivity(),
                        Manifest.permission.READ_EXTERNAL_STORAGE) != PackageManager.PERMISSION_GRANTED)
                {
                    requestPermissions(
                            new String[]{Manifest.permission.READ_EXTERNAL_STORAGE},
                            2000);
                }
                else {
                    openFileChooser();
                }

                dialog.dismiss();
            }
        });
        camera.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                StrictMode.VmPolicy.Builder builder = new StrictMode.VmPolicy.Builder();
                StrictMode.setVmPolicy(builder.build());
                openCamera();
                dialog.dismiss();
            }
        });
        dialog.show();

    }

    private void openCamera() {



        if (ContextCompat.checkSelfPermission(getContext(), Manifest.permission.CAMERA)
                == PackageManager.PERMISSION_DENIED){
            ActivityCompat.requestPermissions(getActivity(), new String[] {Manifest.permission.CAMERA}, 111);
        }else {
            if (ContextCompat.checkSelfPermission(getContext(), Manifest.permission.READ_EXTERNAL_STORAGE)
                    == PackageManager.PERMISSION_DENIED) {
                ActivityCompat.requestPermissions(getActivity(), new String[]{Manifest.permission.READ_EXTERNAL_STORAGE}, 113);
            }else{
                if (ContextCompat.checkSelfPermission(getContext(), Manifest.permission.READ_EXTERNAL_STORAGE)
                        == PackageManager.PERMISSION_DENIED) {
                    ActivityCompat.requestPermissions(getActivity(), new String[]{Manifest.permission.READ_EXTERNAL_STORAGE}, 113);
                }else{
                    Intent cameraIntent = new Intent(android.provider.MediaStore.ACTION_IMAGE_CAPTURE);
//                    File photoFile = null;
//                    try{
//                        photoFile = createPhotoFile();
//                    }catch (Exception e){
//
//                    }
//                    cameraIntent.setType("image/*");
                    final String dir =  Environment.getExternalStoragePublicDirectory(Environment.DIRECTORY_PICTURES)+ "/Folder/";
                    File newdir = new File(dir);
                    newdir.mkdirs();
                    String file = dir+ name.getText().toString()+age.getText().toString()+".jpg";


                    File newfile = new File(file);
                    try {
                        newfile.createNewFile();
                    } catch (IOException e) {}

                    Uri outputFileUri = Uri.fromFile(newfile);
//                    cameraIntent.putExtra(MediaStore.EXTRA_OUTPUT, outputFileUri);
                    startActivityForResult(cameraIntent, USE_CAMERA);
//                    image.setImageURI(outputFileUri);
                }
            }
        }
    }

//    private File createPhotoFile() {
//        String picName = name.getText().toString() + age.getText().toString();
//        File storageDir = getExernal
//
//    }

    private void openFileChooser() {
        Intent galleryIntent = new Intent();
//        startActivityForResult(galleryIntent, 100);
        galleryIntent.setType("image/*");
        galleryIntent.setAction(Intent.ACTION_GET_CONTENT);
        startActivityForResult(galleryIntent, PICK_IMAGE_REQUEST);
    }

    private void attachID(View root) {
        name = root.findViewById(R.id.person_name_et);
        age = root.findViewById(R.id.person_age_et);
        number = root.findViewById(R.id.person_number_et);
        email = root.findViewById(R.id.person_email_et);
        foundAt = root.findViewById(R.id.person_found_at_et);
        image = root.findViewById(R.id.add_image);
        uploadButton = root.findViewById(R.id.upload_button);
    }

    @Override
    public void onActivityResult(int requestCode, int resultCode, @Nullable Intent data) {
        super.onActivityResult(requestCode, resultCode, data);

        if(requestCode == PICK_IMAGE_REQUEST&& resultCode == RESULT_OK && data != null && data.getData() != null){
            imageURI = data.getData();
            image.setImageURI(imageURI);
            image.setBackground(getActivity().getDrawable(R.color.white));
            image.setPadding(0, 0, 0, 0);
        }else if(requestCode == USE_CAMERA ){
            Bitmap photo = (Bitmap) data.getExtras().get("data");
//            imageURI = getImageUri(getActivity(), photo);
            image.setImageBitmap(photo);
//            imageURI = data.getData();
//            image.setImageURI(imageURI);
            Log.i("URI : ", String.valueOf(imageURI));
            image.setBackground(getActivity().getDrawable(R.color.white));
            image.setPadding(0, 0, 0, 0);

        }else{
            Toast.makeText(getContext(), "ERROR" + requestCode + " "+ resultCode, Toast.LENGTH_SHORT).show();
        }


    }

    @Override
    public void onRequestPermissionsResult(int requestCode, @NonNull String[] permissions, @NonNull int[] grantResults) {
        super.onRequestPermissionsResult(requestCode, permissions, grantResults);
        if (requestCode == 111) {
            if (grantResults[0] == PackageManager.PERMISSION_GRANTED) {
                Toast.makeText(getContext(), "Camera Permission Granted!", Toast.LENGTH_LONG).show();
                if (ContextCompat.checkSelfPermission(getContext(), Manifest.permission.WRITE_EXTERNAL_STORAGE)
                        == PackageManager.PERMISSION_DENIED){
                    ActivityCompat.requestPermissions(getActivity(), new String[] {Manifest.permission.WRITE_EXTERNAL_STORAGE}, 112);
                }
            } else {
                Toast.makeText(getContext(), "Camera Permission Denied", Toast.LENGTH_LONG).show();
            }
        }
        if(requestCode == 112) {
            if (grantResults[0] == PackageManager.PERMISSION_GRANTED) {
                if (ContextCompat.checkSelfPermission(getContext(), Manifest.permission.READ_EXTERNAL_STORAGE)
                        == PackageManager.PERMISSION_DENIED) {
                    ActivityCompat.requestPermissions(getActivity(), new String[]{Manifest.permission.READ_EXTERNAL_STORAGE}, 113);
                }
            }else{
                Toast.makeText(getContext(), "Please give all permissions", Toast.LENGTH_SHORT).show();
            }
        }
        if(requestCode == 113) {
            if (grantResults[0] == PackageManager.PERMISSION_GRANTED) {
                Intent cameraIntent = new Intent(MediaStore.ACTION_IMAGE_CAPTURE);
//                cameraIntent.setType("image/*");
                startActivityForResult(cameraIntent, USE_CAMERA);
            }else{
                Toast.makeText(getContext(), "Please give all permissions", Toast.LENGTH_SHORT).show();
            }
        }

    }

    public Uri getImageUri(Context inContext, Bitmap inImage) {
        ByteArrayOutputStream bytes = new ByteArrayOutputStream();
        inImage.compress(Bitmap.CompressFormat.JPEG, 100, bytes);
        String path = MediaStore.Images.Media.insertImage(inContext.getContentResolver(), inImage, "Title", null);
        return Uri.parse(path);
    }

    String getFileExtension(Uri uri){

        ContentResolver cr = getContext().getContentResolver();
        MimeTypeMap mime = MimeTypeMap.getSingleton();
        return mime.getExtensionFromMimeType(cr.getType(uri));
    }
}