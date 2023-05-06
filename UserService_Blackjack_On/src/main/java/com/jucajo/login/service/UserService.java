package com.jucajo.login.service;

import com.jucajo.login.model.User;
import com.jucajo.login.repository.UserRepository;
import org.mindrot.jbcrypt.BCrypt;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class UserService {
    @Autowired
    UserRepository repository;

    public List<User> list() {
        return repository.findAll();
    }

    public User add(User newUser) {
        User userSave = new User(newUser.getId(),
                                newUser.getUsername(),
                                newUser.getEmail(),
                                BCrypt.hashpw(newUser.getPassword(), BCrypt.gensalt()));

        return repository.save(userSave);
    }

    public Optional<User> findByUsername(String username) {
        return repository.findByUsername(username);
    }

    public String login(User user) {
        Optional<User> userCheck = findByUsername(user.getUsername());

        if (userCheck.isPresent()) {
            if (BCrypt.checkpw(user.getPassword(), userCheck.get().getPassword())) {
                return "LogIn";
            } else {
                return "Wrong Password";
            }
        }

        return "No LogIn";
    }
}
