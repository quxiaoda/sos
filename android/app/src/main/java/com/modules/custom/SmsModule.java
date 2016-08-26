package com.modules.custom;

import android.telephony.SmsManager;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.uimanager.IllegalViewOperationException;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactMethod;
import com.facebook.react.bridge.Callback;

// import java.util.String;

public class SmsModule extends ReactContextBaseJavaModule {

    public SmsModule(ReactApplicationContext reactContext) {
        super(reactContext);
    }

    @Override
    public String getName() {
        return "SmsModule";
    }
    // Exposed to the bridge, accessible from javascript
    //需要添加@ReactMethod注解，用于给JavaScript进行调用。
    @ReactMethod
    public void send(String phoneNo, 
                      String sms, 
                      Callback success, // Callback for success 
                      Callback err) { // Callback for error
        try {
            SmsManager m = SmsManager.getDefault();
            m.sendTextMessage(phoneNo, null, sms, null, null);

            success.invoke(); // Call success callback
        } catch (Exception e) {
            err.invoke(e.getMessage());
        }
    }
}