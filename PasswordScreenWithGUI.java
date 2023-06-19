import javax.swing.*;
import javax.swing.border.EmptyBorder;
import java.awt.*;
import java.awt.event.ActionEvent;
import java.awt.event.ActionListener;
import java.io.BufferedWriter;
import java.io.FileWriter;
import java.io.IOException;

public class PasswordScreenWithGUI {
    private static final String PASSWORD = "Tester";
    private static final String FILE_NAME = "words.txt";
    private static final int MAX_WORDS = 24;

    private JFrame frame;
    private JPanel panel;
    private JLabel passwordLabel;
    private JPasswordField passwordField;
    private JButton loginButton;
    private JTextArea wordArea;
    private JButton saveButton;
    private JFrame recentWordsFrame;
    private JTextArea recentWordsArea;

    public PasswordScreenWithGUI() {
        frame = new JFrame("Password Screen");
        frame.setDefaultCloseOperation(JFrame.EXIT_ON_CLOSE);

        panel = new JPanel(new BorderLayout());

        passwordLabel = new JLabel("Enter the password:");
        passwordField = new JPasswordField();
        loginButton = new JButton("Login");
        wordArea = new JTextArea();
        saveButton = new JButton("Save Words");

        JPanel passwordPanel = new JPanel(new FlowLayout(FlowLayout.CENTER));
        passwordPanel.add(passwordLabel);
        passwordPanel.add(passwordField);
        passwordPanel.add(loginButton);

        JPanel wordPanel = new JPanel(new BorderLayout());
        wordPanel.setBorder(BorderFactory.createEmptyBorder(10, 10, 10, 10));

        wordArea.setRows(24);
        wordArea.setLineWrap(true);
        wordArea.setWrapStyleWord(true);

        JScrollPane wordScrollPane = new JScrollPane(wordArea);
        wordPanel.add(wordScrollPane, BorderLayout.CENTER);
        wordPanel.add(saveButton, BorderLayout.SOUTH);
        wordPanel.setPreferredSize(new Dimension(400, 300));

        panel.add(passwordPanel, BorderLayout.NORTH);
        panel.add(wordPanel, BorderLayout.CENTER);

        // Enlarge the password field
        passwordField.setPreferredSize(new Dimension(200, 30));

        frame.getContentPane().add(panel);
        frame.pack();
        frame.setLocationRelativeTo(null); // Center the frame on the screen
        frame.setVisible(true);

        ActionListener loginListener = new ActionListener() {
            @Override
            public void actionPerformed(ActionEvent e) {
                performLogin();
            }
        };

        loginButton.addActionListener(loginListener);
        passwordField.addActionListener(loginListener);

        saveButton.addActionListener(new ActionListener() {
            @Override
            public void actionPerformed(ActionEvent e) {
                String[] words = wordArea.getText().split("\\s+");
                if (words.length > MAX_WORDS) {
                    JOptionPane.showMessageDialog(frame, "You can enter a maximum of " + MAX_WORDS + " words.");
                    return;
                }
                saveWordsToFile(words);
                JOptionPane.showMessageDialog(frame, "Words saved to file successfully.");
                openRecentWordsPage(words);
            }
        });

        // Disable word entry and save button initially
        wordArea.setEnabled(false);
        saveButton.setEnabled(false);
    }

    private void performLogin() {
        String inputPassword = new String(passwordField.getPassword());
        if (inputPassword.equals(PASSWORD)) {
            JOptionPane.showMessageDialog(frame, "Password correct! Access granted.");
            passwordField.setEnabled(false);
            loginButton.setEnabled(false);
            wordArea.setEnabled(true);
            saveButton.setEnabled(true);
        } else {
            JOptionPane.showMessageDialog(frame, "Incorrect password. Access denied.");
        }
    }

    private void saveWordsToFile(String[] words) {
        try {
            BufferedWriter writer = new BufferedWriter(new FileWriter(FILE_NAME));

            for (String word : words) {
                writer.write(word);
                writer.newLine();
            }

            writer.close();
        } catch (IOException e) {
            JOptionPane.showMessageDialog(frame, "An error occurred while saving words to file.");
            e.printStackTrace();
        }
    }

    private void openRecentWordsPage(String[] words) {
        recentWordsFrame = new JFrame("Recently Typed Words");
        recentWordsFrame.setDefaultCloseOperation(JFrame.DISPOSE_ON_CLOSE);

        recentWordsArea = new JTextArea();
        recentWordsArea.setRows(24);
        recentWordsArea.setLineWrap(true);
        recentWordsArea.setWrapStyleWord(true);
        recentWordsArea.setEditable(false);

        JScrollPane recentWordsScrollPane = new JScrollPane(recentWordsArea);

        for (String word : words) {
            recentWordsArea.append(word + "\n");
        }

        recentWordsFrame.getContentPane().add(recentWordsScrollPane);
        recentWordsFrame.setSize(400, 500); // Set the size to a wider rectangle
        recentWordsFrame.setLocationRelativeTo(frame);
        recentWordsFrame.setVisible(true);
    }

    public static void main(String[] args) {
        SwingUtilities.invokeLater(new Runnable() {
            @Override
            public void run() {
                new PasswordScreenWithGUI();
            }
        });
    }
}

