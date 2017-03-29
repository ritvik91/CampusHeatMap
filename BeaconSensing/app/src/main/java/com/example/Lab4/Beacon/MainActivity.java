package com.example.Lab4.Beacon;

import android.os.Bundle;
import android.support.v7.app.AppCompatActivity;
import android.util.Log;
import android.view.Menu;

import com.estimote.sdk.Beacon;
import com.estimote.sdk.BeaconManager;
import com.estimote.sdk.Region;
import com.estimote.sdk.SystemRequirementsChecker;

import java.util.List;
import java.util.UUID;

public class MainActivity extends AppCompatActivity {

    long previousRequestAt;
    BeaconLocation myLocator;

    private BeaconManager beaconManager;
    private Region region1, region2, region3, region4;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.main_activity);
        previousRequestAt = 0;
        myLocator = new BeaconLocation();
        beaconManager = new BeaconManager(this);
        beaconManager.setRangingListener(new BeaconManager.RangingListener() {
            @Override
            public void onBeaconsDiscovered(Region region, List<Beacon> list) {
            
                    previousRequestAt = System.currentTimeMillis();
                    if (!list.isEmpty()) {
                        Beacon nearestBeacon = list.get(0);
                        String locationKey = String.format("%d", nearestBeacon.getMajor());
                        String places = myLocator.getLocationAt(locationKey);
                        Log.d("UF", "You are at " + places);

                    }
                
            }
        });
        //Use UUID, major and minor values of your beacon as parameters. Values must be in hexadecimal
        region1 = new Region("ranged region", UUID.fromString("11111111-1111-1111-1111-111111111111"), 4565, 4565);
        region2 = new Region("ranged region", UUID.fromString("11111111-1111-1111-1111-111111111111"), 7737, 7737);
        region3 = new Region("ranged region", UUID.fromString("11111111-1111-1111-1111-111111111111"), 11155, 11155);
        region4 = new Region("ranged region", UUID.fromString("11111111-1111-1111-1111-111111111111"), 13829, 13829);
    }

    @Override
    protected void onResume() {
        super.onResume();
        SystemRequirementsChecker.checkWithDefaultDialogs(this);
        beaconManager.connect(new BeaconManager.ServiceReadyCallback() {
            @Override
            public void onServiceReady() {
                beaconManager.startRanging(region1);
                beaconManager.startRanging(region2);
                beaconManager.startRanging(region3);
                beaconManager.startRanging(region4);
            }
        });
    }

    @Override
    protected void onPause() {
        super.onPause();
    }

    @Override
    public boolean onCreateOptionsMenu(Menu menu) {
        // Inflate the menu; this adds items to the action bar if it is present.
        getMenuInflater().inflate(R.menu.menu_main, menu);
        return true;
    }
}
