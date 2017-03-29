package com.example.Lab4.Beacon;

import java.util.HashMap;



public class BeaconLocation {

    HashMap<String, String> Map;
    HashMap<String, Integer> location_ID;

    public BeaconLocation() {
        Map = new HashMap<String, String>();
        location_ID = new HashMap<String, Integer>();
        //Use major value of the beacon. Value must be in hex
        Map.put("4369", "Marston");
        Map.put("8738", "Rawlings");
        Map.put("13107", "CSE");
        Map.put("17476", "Reitz");
        location_ID.put("4369", 1);
        location_ID.put("8738", 3);
        location_ID.put("13107", 5);
        location_ID.put("17476", 7);
    }

    public String getLocationAt(String code) {
        if (Map.containsKey(code))
            return Map.get(code);
        else
            return null;
    }

    public int getCode(String code, String type) {
        if (location_ID.containsKey(code))
        {
            if (type.equals("entry"))
                return location_ID.get(code);
            else
                return location_ID.get(code) + 1;
        }
        else
            return 0;
    }
}
