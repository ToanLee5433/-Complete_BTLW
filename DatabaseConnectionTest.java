package com.example.database_test;

import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.Statement;
import java.sql.ResultSet;

public class DatabaseConnectionTest {
    private static final String URL = "jdbc:mysql://localhost:3306/";
    private static final String USER = "root";
    private static final String PASSWORD = "callofduty12345";

    public static void main(String[] args) {
        System.out.println("==========================================");
        System.out.println("   KIEM TRA KET NOI MYSQL VA TAO DATABASE");
        System.out.println("==========================================");
        
        try {
            // Kiem tra ket noi MySQL
            System.out.println("\n[1/4] Kiem tra ket noi MySQL...");
            Connection connection = DriverManager.getConnection(URL, USER, PASSWORD);
            System.out.println("✓ Ket noi MySQL thanh cong!");
            
            // Tao database
            System.out.println("\n[2/4] Tao database btl_ltw...");
            Statement statement = connection.createStatement();
            statement.executeUpdate("CREATE DATABASE IF NOT EXISTS btl_ltw");
            System.out.println("✓ Database btl_ltw da duoc tao!");
            
            // Kiem tra database da ton tai
            System.out.println("\n[3/4] Kiem tra database...");
            ResultSet resultSet = statement.executeQuery("SHOW DATABASES");
            boolean found = false;
            System.out.println("Danh sach database:");
            while (resultSet.next()) {
                String dbName = resultSet.getString(1);
                System.out.println("  - " + dbName);
                if ("btl_ltw".equals(dbName)) {
                    found = true;
                }
            }
            
            if (found) {
                System.out.println("✓ Database btl_ltw da ton tai!");
            } else {
                System.out.println("✗ Database btl_ltw chua duoc tao!");
            }
            
            // Kiem tra ket noi den database btl_ltw
            System.out.println("\n[4/4] Kiem tra ket noi den database btl_ltw...");
            Connection dbConnection = DriverManager.getConnection(URL + "btl_ltw", USER, PASSWORD);
            System.out.println("✓ Ket noi den database btl_ltw thanh cong!");
            
            // Dong ket noi
            dbConnection.close();
            connection.close();
            
            System.out.println("\n==========================================");
            System.out.println("   KIEM TRA HOAN THANH - TAT CA OK!");
            System.out.println("==========================================");
            System.out.println("Ban co the chay backend Spring Boot ngay bay gio!");
            
        } catch (Exception e) {
            System.out.println("\n✗ Loi ket noi: " + e.getMessage());
            System.out.println("\nCac giai phap co the:");
            System.out.println("1. Kiem tra MySQL da chay chua");
            System.out.println("2. Kiem tra username/password");
            System.out.println("3. Thu doi password thanh rong hoac password khac");
            System.out.println("4. Chay lenh SQL thu cong trong phpMyAdmin");
        }
    }
}
