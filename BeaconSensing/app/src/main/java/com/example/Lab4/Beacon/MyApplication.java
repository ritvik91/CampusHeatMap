package com.example.Lab4.Beacon;

import android.app.Application;
import android.app.Notification;
import android.app.NotificationManager;
import android.app.PendingIntent;
import android.content.Context;
import android.content.Intent;

import com.estimote.sdk.Beacon;
import com.estimote.sdk.BeaconManager;
import com.estimote.sdk.Region;

import java.util.List;
import java.util.UUID;


public class MyApplication extends Application {
    BeaconLocation myLocator;
    String currentLocation;
    private BeaconManager beaconManager;
    VolleyQueue volleyQueue;
    @Override
    public void onCreate() {
        super.onCreate();
        volleyQueue = new VolleyQueue(getApplicationContext());
        myLocator = new BeaconLocation();
        final String macAddress = android.provider.Settings.Secure.getString(getApplicationContext().getContentResolver(), "bluetooth_address");
        beaconManager = new BeaconManager(getApplicationContext());
        beaconManager.setMonitoringListener(new BeaconManager.MonitoringListener() {
            @Override
            public void onEnteredRegion(Region region, List<Beacon> list) {
                String location = myLocator.getLocationAt(String.valueOf(list.get(0).getMajor()));
                currentLocation = location;
                showNotification(
                        "You are",
                        "at " + location);
                volleyQueue.addMessage(new String[] {String.valueOf(myLocator.getCode(String.valueOf(list.get(0).getMajor()), "entry"))});
                

            }
            @Override
            public void onExitedRegion(Region region) {
                String location = myLocator.getLocationAt(String.valueOf(region.getMajor()));
                int locationCode = myLocator.getCode(String.valueOf(region.getMajor()), "exit");
                showNotification("Bye", "You just left " + location);
                volleyQueue.addMessage(new String[]{String.valueOf(locationCode)});
              
            }
        });
        beaconManager.connect(new BeaconManager.ServiceReadyCallback() {
            @Override
            public void onServiceReady() {
                //Use UUID, major and minor values of your beacon as parameters. Values must be in hexa
                beaconManager.startMonitoring(new Region("monitored region 1",
                        UUID.fromString("11111111-1111-1111-1111-111111111111"), 4565, 4565));
                beaconManager.startMonitoring(new Region("monitored region 2",
                        UUID.fromString("11111111-1111-1111-1111-111111111111"), 7737 , 7737));
                beaconManager.startMonitoring(new Region("monitored region 3",
                        UUID.fromString("11111111-1111-1111-1111-111111111111"), 11155 , 11155));
                beaconManager.startMonitoring(new Region("monitored region 4",
                        UUID.fromString("11111111-1111-1111-1111-111111111111"), 13829 , 13829));
            }
        });
    }

    public void showNotification(String title, String message) {
        Intent notifyIntent = new Intent(this, MainActivity.class);
        notifyIntent.setFlags(Intent.FLAG_ACTIVITY_SINGLE_TOP);
        PendingIntent pendingIntent = PendingIntent.getActivities(this, 0,
                new Intent[]{notifyIntent}, PendingIntent.FLAG_UPDATE_CURRENT);
        Notification notification = new Notification.Builder(this)
                .setSmallIcon(android.R.drawable.ic_dialog_info)
                .setContentTitle(title)
                .setContentText(message)
                .setAutoCancel(true)
                .setContentIntent(pendingIntent)
                .build();
        notification.defaults |= Notification.DEFAULT_SOUND;
        NotificationManager notificationManager =
                (NotificationManager) getSystemService(Context.NOTIFICATION_SERVICE);
        notificationManager.notify(1, notification);
    }
}
